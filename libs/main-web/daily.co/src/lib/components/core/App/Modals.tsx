import DeviceSelectModal from '../../shared/components/DeviceSelectModal/DeviceSelectModal';
import { useUIState } from '../../shared/contexts/UIStateProvider';

const Modals: React.FC = () => {
  const { modals } = useUIState();

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <DeviceSelectModal />
      {modals.map((ModalComponent: React.FC) => (
        <ModalComponent key={ModalComponent.name} />
      ))}
    </>
  );
};
export default Modals;
