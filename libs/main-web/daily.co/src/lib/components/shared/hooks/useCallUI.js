import React, { useCallback, useEffect } from 'react';
import Loader from '@custom/shared/components/Loader';
import MessageCard from '@custom/shared/components/MessageCard';
import {
  CallState.ENDED,
  CallState.JOINED,
  CallState.JOINING,
  CallState.LOBBY,
  CallState.NOT_FOUND,
  CallState.NOT_BEFORE,
  CallState.READY,
  CallState.REDIRECTING,
  CallState.NOT_ALLOWED,
  CallState.EXPIRED,
} from '@custom/shared/contexts/useCallMachine';
import { useRouter } from 'next/router';
import HairCheck from '../components/HairCheck';

export const useCallUI = ({
  state,
  room,
  haircheck,
  redirectUrl,
  callEnded,
  notFoundRedirect = 'not-found',
}) => {
  const router = useRouter();

  useEffect(() => {
    console.log(`%c🔀 App state changed: ${state}`, `color: gray;`);
  }, [state]);

  const renderByState = useCallback(() => {
    // Show loader when state is undefined or ready to join
    if (!state || [CallState.READY, CallState.JOINING].includes(state)) {
      return <Loader />;
    }

    // Update the UI based on the state of our call
    switch (state) {
      case CallState.NOT_FOUND:
        router.replace(notFoundRedirect);
        return null;
      case CallState.NOT_ALLOWED:
        return (
          <MessageCard error header="Access denied">
            You are not allowed to join this meeting. Please make sure you have
            a valid meeting token.
          </MessageCard>
        );
      case CallState.NOT_BEFORE:
        return (
          <MessageCard error header="Cannot join before owner">
            This room has `nbf` set, meaning you cannot join the call before the
            owner
          </MessageCard>
        );
      case CallState.EXPIRED:
        return (
          <MessageCard error header="Room expired">
            The room you are trying to join has expired. Please create or join
            another room.
          </MessageCard>
        );
      case CallState.LOBBY:
        return haircheck ? haircheck() : <HairCheck />;
      case CallState.JOINED:
        return room ? (
          room
        ) : (
          <MessageCard error header="No room component declared" />
        );
      case CallState.REDIRECTING:
        if (!redirectUrl) {
          break;
        }
        window.location = redirectUrl;
        break;
      case CallState.ENDED:
        return callEnded ? (
          callEnded()
        ) : (
          <MessageCard>
            You have left the call (either manually or because the room
            expired). We hope you had fun!
          </MessageCard>
        );
      default:
        break;
    }

    return (
      <MessageCard error header="An unknown error occured">
        A fatal error occured in the call loop. Please check you have entered a
        valid <code>DAILY_DOMAIN</code> and <code>DAILY_API_KEY</code>{' '}
        environmental variables.
      </MessageCard>
    );
  }, [
    state,
    notFoundRedirect,
    redirectUrl,
    haircheck,
    room,
    callEnded,
    router,
  ]);

  return renderByState;
};

export default useCallUI;
