import AgoraRTC from 'agora-rtc-sdk-ng';
// types
import { RtcObject } from '../types';

const rtc: RtcObject = {
  localAudioTrack: null,
  localVideoTrack: null,
  client: null,
};

async function startBasicCall() {
  // create an AgoraRTCClient object
  rtc.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  // listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object
  rtc.client.on('user-published', async (user: any, mediaType: any) => {
    // subscribe to the remote user when the SDK triggers the "user-published" event
    await rtc.client!.subscribe(user, mediaType);
    console.log('subscribe success');

    // if the remote user publishes a video track
    if (mediaType === 'video') {
      // get the RemoteVideoTrack object in the AgoraRTCRemoteUser object
      const remoteVideoTrack = user.videoTrack;
      // dynamically create a container in the form of a DIV element
      // for playing the remote video track
      const remotePlayerContainer = document.createElement('div');
      // specify the ID of the DIV container. You can use the uid of the remote user
      remotePlayerContainer.id = user.uid.toString();
      remotePlayerContainer.textContent = 'Remote user ' + user.uid.toString();
      remotePlayerContainer.style.width = '640px';
      remotePlayerContainer.style.height = '480px';
      document.body.append(remotePlayerContainer);

      // play the remote video track
      // pass the DIV container and the SDK dynamically creates a player
      // in the container for playing the remote video track
      remoteVideoTrack.play(remotePlayerContainer);

      // or just pass the ID of the DIV container:
      // remoteVideoTrack.play(playerContainer.id);
    }

    // if the remote user publishes an audio track
    if (mediaType === 'audio') {
      // get the RemoteAudioTrack object in the AgoraRTCRemoteUser object
      const remoteAudioTrack = user.audioTrack;
      // play the remote audio track. No need to pass any DOM element
      remoteAudioTrack.play();
    }

    // listen for the "user-unpublished" event
    rtc.client!.on('user-unpublished', (user: any) => {
      // get the dynamically created DIV container
      const remotePlayerContainer = document.getElementById(user.uid);
      // destroy the container
      remotePlayerContainer!.remove();
    });
  });
}
