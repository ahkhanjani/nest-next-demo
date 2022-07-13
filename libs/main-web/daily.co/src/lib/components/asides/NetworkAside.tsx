import { useCallback, useMemo, useEffect, useState } from 'react';
// daily.co
import { DailyNetworkStats } from '@daily-co/daily-js';
// hooks
import { useCallState } from '../../context/CallProvider';
// enums
import { NETWORK_QUALITY_LABELS } from '../../constants';
import Capsule from '../Capsule';

export const NetworkAside = () => {
  // ─── State ──────────────────────────────────────────────────────────────────────

  const [networkStats, setNetworkStats] = useState<DailyNetworkStats | null>(
    null
  );

  // ─── Hooks ──────────────────────────────────────────────────────────────────────

  const { callObject } = useCallState();

  // ─── Callback ───────────────────────────────────────────────────────────────────

  const updateStats = useCallback(async () => {
    if (!callObject) return;
    setNetworkStats(await callObject.getNetworkStats());
  }, [callObject]);

  useEffect(() => {
    if (!callObject) return;

    updateStats();

    const i = setInterval(updateStats, 2000);

    return () => clearInterval(i);
  }, [callObject, updateStats]);

  // ─── Memo ───────────────────────────────────────────────────────────────────────

  const downloadKbs = useMemo(
    () =>
      Math.round(
        (networkStats?.stats?.latest?.videoRecvBitsPerSecond ?? 0) / 1000
      ),
    [networkStats?.stats?.latest?.videoRecvBitsPerSecond]
  );

  const uploadKbs = useMemo(
    () =>
      Math.round(
        (networkStats?.stats?.latest?.videoSendBitsPerSecond ?? 0) / 1000
      ),
    [networkStats?.stats?.latest?.videoSendBitsPerSecond]
  );

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <div className="network-aside">
      {networkStats ? (
        <>
          <div className="panel">
            <h4>Packet Loss:</h4>
            Your network quality is:
            <Capsule variant="success">
              {NETWORK_QUALITY_LABELS[networkStats.threshold]}
            </Capsule>
          </div>
          <div className="panel">
            <h4>Download rate:</h4>
            {downloadKbs} kbps
          </div>
          <div className="panel">
            <h4>Upload rate:</h4>
            {uploadKbs} kbps
          </div>
          <div className="note">
            Download and upload rates reflect bandwidth used by this call.
            Updated every 2 seconds.
          </div>
        </>
      ) : (
        <span>Fetching network stats...</span>
      )}
    </div>
  );
};
export default NetworkAside;
