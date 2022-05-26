import AgoraRTC from 'agora-rtc-sdk-ng';
import { useCallback } from 'react';
// types
import { ConnectionOptions, RtcObject } from '../types';
// styles
import styles from './LeaveButton.module.scss';

const JoinButton: React.FC<SubmitButtonProps> = ({
  // TODO handle loading progress bar
  rtc,
  options,
  loading = false,
}) => {
  const join = useCallback(async () => {
    if (!rtc.localAudioTrack || !rtc.localVideoTrack || !rtc.client) {
      console.error('Rtc error');
      return;
    }

    // join an RTC channel.
    await rtc.client.join(
      options.appId!,
      options.channel,
      options.token!,
      options.uid
    );
    // create a local audio track from the audio sampled by a microphone
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // create a local video track from the video captured by a camera
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // publish the local audio and video tracks to the RTC channel
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    // dynamically create a container in the form of a DIV element for playing the local video track
    const localPlayerContainer = document.createElement('div');
    // specify the ID of the DIV container. You can use the uid of the local user
    localPlayerContainer.id = options.uid;
    localPlayerContainer.textContent = 'Local user ' + options.uid;
    localPlayerContainer.style.width = '640px';
    localPlayerContainer.style.height = '480px';
    document.body.append(localPlayerContainer);

    // Play the local video track.
    // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
    rtc.localVideoTrack.play(localPlayerContainer);
    console.log('publish success!');
  }, []);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleClick() {
    join();
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <button className={styles.submitButton} onClick={handleClick} type='button'>
      Leave
    </button>
  );
};
export default JoinButton;

interface SubmitButtonProps {
  rtc: RtcObject;
  options: ConnectionOptions;
  loading?: boolean;
}
