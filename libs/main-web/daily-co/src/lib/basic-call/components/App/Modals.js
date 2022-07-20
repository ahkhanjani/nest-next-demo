import React from 'react';
import DeviceSelectModal from '../../../shared/components/DeviceSelectModal/DeviceSelectModal';
import { useUIState } from '../../../shared/contexts/UIStateProvider';

export const Modals = () => {
  const { modals } = useUIState();

  return (
    <>
      <DeviceSelectModal />
      {modals.map((ModalComponent) => (
        <ModalComponent key={ModalComponent.name} />
      ))}
    </>
  );
};

export default Modals;
