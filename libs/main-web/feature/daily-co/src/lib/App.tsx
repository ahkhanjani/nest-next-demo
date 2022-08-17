import React, { useState, useCallback } from 'react';
import { CallProvider } from './contexts/CallProvider';
import { MediaDeviceProvider } from './contexts/MediaDeviceProvider';
import { ParticipantsProvider } from './contexts/ParticipantsProvider';
import { ScreenShareProvider } from './contexts/ScreenShareProvider';
import { TracksProvider } from './contexts/TracksProvider';
import { UIStateProvider } from './contexts/UIStateProvider';
import { WaitingRoomProvider } from './contexts/WaitingRoomProvider';
import getDemoProps from './lib/demoProps';
import { ChatProvider } from './contexts/ChatProvider';
import CreatingRoom from './components/Prejoin/CreatingRoom';
import Intro from './components/Prejoin/Intro';
import NotConfigured from './components/Prejoin/NotConfigured';
import AppBase from './components/App';
import { DailyRoomInfo } from '@daily-co/daily-js';

export const App: React.FC<AppProps> = ({
  domain,
  isConfigured = false,
  forceFetchToken = false,
  forceOwner = false,
  subscribeToTracksAutomatically = true,
  demoMode = false,
  asides,
  modals,
  customTrayComponent,
  customAppComponent,
}) => {
  const [roomName, setRoomName] = useState<DailyRoomInfo>();
  const [fetchingToken, setFetchingToken] = useState(false);
  const [token, setToken] = useState();
  const [tokenError, setTokenError] = useState();

  const getMeetingToken = useCallback(
    async (room: DailyRoomInfo, isOwner = false) => {
      if (!room) return false;
      setFetchingToken(true);

      // Fetch token from serverside method (provided by Next)
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomName: room, isOwner }),
      });
      const resJson = await res.json();

      if (!resJson?.token) {
        setTokenError(resJson?.error || true);
        setFetchingToken(false);
        return false;
      }

      if (process.env['NODE_ENV'] !== 'production') {
        console.log(`🪙 Token received`);
      }

      setFetchingToken(false);
      setToken(resJson.token);

      // Setting room name will change ready state
      setRoomName(room);

      return true;
    },
    [],
  );

  const isReady = !!(isConfigured && roomName);

  if (!isReady) {
    return (
      <main>
        {(() => {
          if (!isConfigured) return <NotConfigured />;
          if (demoMode) return <CreatingRoom onCreated={getMeetingToken} />;
          return (
            <Intro
              forceFetchToken={forceFetchToken}
              forceOwner={forceOwner}
              title={process.env['PROJECT_TITLE'] || 'title...'}
              room={roomName}
              error={tokenError}
              fetching={fetchingToken}
              domain={domain}
              onJoin={(
                room: DailyRoomInfo,
                isOwner: boolean,
                fetchToken: unknown,
              ) =>
                fetchToken ? getMeetingToken(room, isOwner) : setRoomName(room)
              }
            />
          );
        })()}
      </main>
    );
  }

  return (
    <UIStateProvider
      asides={asides}
      modals={modals}
      customTrayComponent={customTrayComponent}
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
                    <AppBase />
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
export default App;

interface AppProps {
  isConfigured: boolean;
  domain?: string;
  asides?: React.FC[];
  modals?: React.FC[];
  customTrayComponent?: React.FC;
  customAppComponent?: React.FC;
  forceFetchToken?: boolean;
  forceOwner?: boolean;
  subscribeToTracksAutomatically?: boolean;
  demoMode?: boolean;
}

export async function getStaticProps() {
  const defaultProps = getDemoProps();
  return {
    props: defaultProps,
  };
}
