import React from 'react';
import {
  WaitingRoomModal,
  WaitingRoomNotification,
} from '../../../shared/components/WaitingRoom';
import { useWaitingRoom } from '../../../shared/contexts/WaitingRoomProvider';

export const WaitingRoom = () => {
  const { setShowModal, showModal } = useWaitingRoom();
  return (
    <>
      <WaitingRoomNotification />
      {showModal && <WaitingRoomModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default WaitingRoom;
