import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useWaitingParticipants } from '@daily-co/daily-react-hooks';

// TODO provide a type
const WaitingRoomContext = createContext<any>(null);

export const WaitingRoomProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { waitingParticipants, grantAccess, denyAccess } =
    useWaitingParticipants();
  const [showModal, setShowModal] = useState(false);

  const multipleWaiting = useMemo(
    () => waitingParticipants.length > 1,
    [waitingParticipants]
  );

  useEffect(() => {
    if (waitingParticipants.length === 0) {
      setShowModal(false);
    }
  }, [waitingParticipants]);

  return (
    <WaitingRoomContext.Provider
      value={{
        denyAccess,
        grantAccess,
        setShowModal,
        showModal,
        waitingParticipants,
        multipleWaiting,
      }}
    >
      {children}
    </WaitingRoomContext.Provider>
  );
};

export const useWaitingRoom = () => useContext(WaitingRoomContext);
