import { NetworkAside } from '../../shared/components/Aside';
import { PeopleAside } from '../../shared/components/Aside';
import { useUIState } from '../../shared/contexts/UIStateProvider';

const Asides: React.FC = () => {
  const { asides } = useUIState();

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <PeopleAside />
      <NetworkAside />
      {asides.map((AsideComponent: React.FC) => (
        <AsideComponent key={AsideComponent.name} />
      ))}
    </>
  );
};
export default Asides;
