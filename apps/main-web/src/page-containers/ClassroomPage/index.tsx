import { useState } from 'react';
// daily.co
// - providers
import { CallProvider } from '@fm/daily.co/components/shared/providers/CallProvider';
import { MediaDeviceProvider } from '@fm/daily.co/components/shared/contexts/MediaDeviceProvider';
import { ParticipantsProvider } from '@fm/daily.co/components/shared/providers/ParticipantsProvider';
import { ScreenShareProvider } from '@fm/daily.co/components/shared/contexts/ScreenShareProvider';
import { TracksProvider } from '@fm/daily.co/components/shared/contexts/TracksProvider';
import { UIStateProvider } from '@fm/daily.co/components/shared/contexts/UIStateProvider';
import { WaitingRoomProvider } from '@fm/daily.co/components/shared/providers/WaitingRoomProvider';
// - libs
import getDemoProps from '@fm/daily.co/components/shared/lib/demoProps';
// - cmp
import CoreApp from '@fm/daily.co/components/core/App';
import Tray from '@fm/daily.co/components/addons/text-chat/components/Tray';
import { ChatProvider } from '@fm/daily.co/components/addons/text-chat/contexts/ChatProvider';

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
                  <ChatProvider>
                    <CoreApp />
                  </ChatProvider>
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
