import Modal from '../../components/Modal';
import { useUIState } from '../../contexts/UIStateProvider';
import Button from '../Button';
import DeviceSelect from '../DeviceSelect';

export const DEVICE_MODAL = 'device';

export const DeviceSelectModal = () => {
  const { currentModals, closeModal } = useUIState();

  return (
    <Modal
      title="Select your device"
      isOpen={currentModals[DEVICE_MODAL]}
      onClose={() => closeModal(DEVICE_MODAL)}
      actions={[
        <Button key="close" fullWidth variant="outline">
          Cancel
        </Button>,
        <Button key="update" fullWidth>
          Update
        </Button>,
      ]}
    >
      <DeviceSelect />
    </Modal>
  );
};

export default DeviceSelectModal;