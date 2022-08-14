import { NetworkAside } from '../Aside';
import { PeopleAside } from '../Aside';
import { useUIState } from '../../contexts/UIStateProvider';

export const Asides = () => {
  const { asides } = useUIState();

  return (
    <>
      <PeopleAside />
      <NetworkAside />
      {asides.map((AsideComponent) => (
        <AsideComponent key={AsideComponent.name} />
      ))}
    </>
  );
};

export default Asides;
