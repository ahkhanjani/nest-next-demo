// cmp
import {
  WaitingRoomModal,
  WaitingRoomNotification,
} from '../../shared/components/WaitingRoom';
// providers
import { useWaitingRoom } from '../../shared/contexts/WaitingRoomProvider';

const WaitingRoom: React.FC = () => {
  const { setShowModal, showModal } = useWaitingRoom();

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <WaitingRoomNotification />
      {showModal && <WaitingRoomModal onClose={() => setShowModal(false)} />}
    </>
  );
};
export default WaitingRoom;
