import { DailyCall, DailyEventObject } from '@daily-co/daily-js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCallState } from '../contexts/CallProvider';
import { VIDEO_QUALITY } from '../contexts/enums/video-quality.enum';

const STANDARD_HIGH_BITRATE_CAP = 980;
const STANDARD_LOW_BITRATE_CAP = 300;

export const useNetworkState = (
  co: DailyCall | null = null,
  quality: VIDEO_QUALITY = VIDEO_QUALITY.HIGH
) => {
  const [threshold, setThreshold] = useState<VIDEO_QUALITY>(VIDEO_QUALITY.HIGH);
  const lastSetKBS = useRef<unknown>(null);

  const callState = useCallState();

  const callObject = co ?? callState?.callObject;

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
        case VIDEO_QUALITY.VERY_LOW:
          setQuality(VIDEO_QUALITY.BANDWIDTH_SAVER);
          setThreshold(VIDEO_QUALITY.VERY_LOW);
          break;
        case VIDEO_QUALITY.LOW:
          setQuality(
            quality === VIDEO_QUALITY.BANDWIDTH_SAVER
              ? quality
              : VIDEO_QUALITY.LOW
          );
          setThreshold(VIDEO_QUALITY.LOW);
          break;
        case VIDEO_QUALITY.HIGH:
          setQuality(
            [VIDEO_QUALITY.BANDWIDTH_SAVER, VIDEO_QUALITY.LOW].includes(quality)
              ? quality
              : VIDEO_QUALITY.HIGH
          );
          setThreshold(VIDEO_QUALITY.HIGH);
          break;
      }
    },
    [quality, setQuality, threshold]
  );

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

  return threshold;
};
