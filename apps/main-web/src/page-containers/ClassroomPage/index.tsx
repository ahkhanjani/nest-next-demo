import { useState } from 'react';
// daily.co
// - contexts
import { CallProvider } from '@fm/daily.co/components/shared/contexts/CallProvider';
import { MediaDeviceProvider } from '@fm/daily.co/components/shared/contexts/MediaDeviceProvider';
import { ParticipantsProvider } from '@fm/daily.co/components/shared/contexts/ParticipantsProvider';
import { ScreenShareProvider } from '@fm/daily.co/components/shared/contexts/ScreenShareProvider';
import { TracksProvider } from '@fm/daily.co/components/shared/contexts/TracksProvider';
import { UIStateProvider } from '@fm/daily.co/components/shared/contexts/UIStateProvider';
import { WaitingRoomProvider } from '@fm/daily.co/components/shared/contexts/WaitingRoomProvider';
// - libs
import getDemoProps from '@fm/daily.co/components/shared/lib/demoProps';
// - cmp
import Tray from '@fm/daily.co/components/addons/text-chat/components/Tray';
import TextChatApp from '@fm/daily.co/components/addons/text-chat/components/App';

const ClassroomPage: React.FC<ClassroomPageProps> = ({
  domain,
  subscribeToTracksAutomatically = true,
  modals,
  roomId,
}) => {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [roomName, setRoomName] = useState<string>('');
  const [token, setToken] = useState<string>('');

  // ────────────────────────────────────────────────────────────────────────────────

  const asides = [];
  return (
    <UIStateProvider
      asides={asides}
      modals={modals}
      customTrayComponent={<Tray />}
    >
      <CallProvider
        domain={domain}
        room={roomName}
        token={token}
        subscribeToTracksAutomatically={subscribeToTracksAutomatically}
      >
        <ParticipantsProvider>
          <TracksProvider>
            <MediaDeviceProvider>
              <WaitingRoomProvider>
                <ScreenShareProvider>
                  <TextChatApp />
                </ScreenShareProvider>
              </WaitingRoomProvider>
            </MediaDeviceProvider>
          </TracksProvider>
        </ParticipantsProvider>
      </CallProvider>
    </UIStateProvider>
  );
};
export default ClassroomPage;

export async function getStaticProps() {
  const defaultProps = getDemoProps();
  return {
    props: defaultProps,
  };
}

interface ClassroomPageProps {
  roomId: string | string[];
  domain: string;
  subscribeToTracksAutomatically: boolean;
  modals: ((...args: unknown[]) => unknown)[];
}
