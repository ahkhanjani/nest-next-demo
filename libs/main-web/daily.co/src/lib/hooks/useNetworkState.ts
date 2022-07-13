import { useCallback, useEffect, useRef, useState } from 'react';
// daily.co
import { DailyCall, DailyEventObject } from '@daily-co/daily-js';
// providers
import { useCallState } from '../context/CallProvider';
// enums
import { VIDEO_QUALITY } from '../enums';

const STANDARD_HIGH_BITRATE_CAP = 980;
const STANDARD_LOW_BITRATE_CAP = 300;

export const useNetworkState = ({
  co = null,
  quality = VIDEO_QUALITY.HIGH,
}: UseNetworkStateProps) => {
  // ─── State ──────────────────────────────────────────────────────────────────────

  const [threshold, setThreshold] = useState('good');
  const lastSetKBS = useRef<unknown>(null);

  // ─── Hooks ──────────────────────────────────────────────────────────────────────

  const callState = useCallState();

  const callObject = co ?? callState?.callObject;

  // ─── Callback ───────────────────────────────────────────────────────────────────

  const setQuality = useCallback(
    async (q: VIDEO_QUALITY) => {
      if (!callObject) return;
      const peers = Object.keys(callObject.participants()).length - 1;
      const isSFU = (await callObject.getNetworkTopology()).topology === 'sfu';
      const lowKbs = isSFU
        ? STANDARD_LOW_BITRATE_CAP
        : Math.floor(STANDARD_LOW_BITRATE_CAP / Math.max(1, peers));
      const highKbs = isSFU
        ? STANDARD_HIGH_BITRATE_CAP
        : Math.floor(STANDARD_HIGH_BITRATE_CAP / Math.max(1, peers));

      switch (q) {
        case VIDEO_QUALITY.AUTO:
        case VIDEO_QUALITY.HIGH:
          if (lastSetKBS.current === highKbs) break;
          callObject.setBandwidth({
            kbs: highKbs,
          });
          lastSetKBS.current = highKbs;
          break;
        case VIDEO_QUALITY.LOW:
          if (lastSetKBS.current === lowKbs) break;
          callObject.setBandwidth({
            kbs: lowKbs,
          });
          lastSetKBS.current = lowKbs;
          break;
        case VIDEO_QUALITY.BANDWIDTH_SAVER:
          callObject.setLocalVideo(false);
          if (lastSetKBS.current === lowKbs) break;
          callObject.setBandwidth({
            kbs: lowKbs,
          });
          lastSetKBS.current = lowKbs;
          break;
      }
    },
    [callObject]
  );

  const handleNetworkQualityChange = useCallback(
    (ev: DailyEventObject) => {
      if (ev.threshold === threshold) return;

      switch (ev.threshold) {
        case 'very-low':
          setQuality(VIDEO_QUALITY.BANDWIDTH_SAVER);
          setThreshold('very-low');
          break;
        case 'low':
          setQuality(
            quality === VIDEO_QUALITY.BANDWIDTH_SAVER
              ? quality
              : VIDEO_QUALITY.LOW
          );
          setThreshold('low');
          break;
        case 'good':
          setQuality(
            [VIDEO_QUALITY.BANDWIDTH_SAVER, VIDEO_QUALITY.LOW].includes(quality)
              ? quality
              : VIDEO_QUALITY.HIGH
          );
          setThreshold('good');
          break;
      }
    },
    [quality, setQuality, threshold]
  );

  // ─── Effect ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!callObject) return;
    callObject.on('network-quality-change', handleNetworkQualityChange);
    return () => {
      callObject.off('network-quality-change', handleNetworkQualityChange);
    };
  }, [callObject, handleNetworkQualityChange]);

  useEffect(() => {
    if (!callObject) return;
    setQuality(quality);
    let timeout: NodeJS.Timeout;
    const handleParticipantCountChange = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setQuality(quality);
      }, 500);
    };
    callObject.on('participant-joined', handleParticipantCountChange);
    callObject.on('participant-left', handleParticipantCountChange);
    return () => {
      callObject.off('participant-joined', handleParticipantCountChange);
      callObject.off('participant-left', handleParticipantCountChange);
    };
  }, [callObject, quality, setQuality]);

  // ────────────────────────────────────────────────────────────────────────────────

  return threshold;
};

interface UseNetworkStateProps {
  co?: DailyCall | null;
  quality?: VIDEO_QUALITY;
}
