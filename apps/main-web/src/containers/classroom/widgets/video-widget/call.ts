import AgoraRTC from 'agora-rtc-sdk-ng';
import { ConnectionOptions } from 'containers/classroom/types';

let options: ConnectionOptions = {
  appId: process.env.AGORA_APP_ID,
  channel: 'test',
  token: process.env.AGORA_APP_CERTIFICATE,
  uid: '123456',
};

window.onload = function () {
  document.getElementById('join').onclick = async function () {
    // Join an RTC channel.
    await rtc.client.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );
    // Create a local audio track from the audio sampled by a microphone.
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a local video track from the video captured by a camera.
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // Publish the local audio and video tracks to the RTC channel.
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    // Dynamically create a container in the form of a DIV element for playing the local video track.
    const localPlayerContainer = document.createElement('div');
    // Specify the ID of the DIV container. You can use the uid of the local user.
    localPlayerContainer.id = options.uid;
    localPlayerContainer.textContent = 'Local user ' + options.uid;
    localPlayerContainer.style.width = '640px';
    localPlayerContainer.style.height = '480px';
    document.body.append(localPlayerContainer);

    // Play the local video track.
    // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
    rtc.localVideoTrack.play(localPlayerContainer);
    console.log('publish success!');
  };

  document.getElementById('leave').onclick = async function () {
    //       // Destroy the local audio and video tracks.
    //       rtc.localAudioTrack.close();
    //       rtc.localVideoTrack.close();
    //
    //       // Traverse all remote users.
    //       rtc.client.remoteUsers.forEach((user) => {
    //         // Destroy the dynamically created DIV containers.
    //         const playerContainer = document.getElementById(user.uid);
    //         playerContainer && playerContainer.remove();
    //       });
    //
    //       // Leave the channel.
    //       await rtc.client.leave();
  };
};

startBasicCall();
