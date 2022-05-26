// types
import { RtcObject } from '../types';
// styles
import styles from './LeaveButton.module.scss';

const LeaveButton: React.FC<SubmitButtonProps> = ({
  // TODO handle loading progress bar
  rtc,
  loading = false,
}) => {
  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleClick() {
    if (!rtc.localAudioTrack || !rtc.localVideoTrack || !rtc.client) {
      console.error('Rtc error');
      return;
    }
    // Destroy the local audio and video tracks.
    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();

    // Traverse all remote users.
    rtc.client.remoteUsers.forEach((user) => {
      // Destroy the dynamically created DIV containers.
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });

    // Leave the channel.
    await rtc.client.leave();
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <button className={styles.submitButton} onClick={handleClick} type='button'>
      Leave
    </button>
  );
};
export default LeaveButton;

interface SubmitButtonProps {
  rtc: RtcObject;
  loading?: boolean;
}
