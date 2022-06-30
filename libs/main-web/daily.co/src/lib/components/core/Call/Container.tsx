import { PropsWithChildren, useMemo } from 'react';
// cmp
import { Audio } from '../../shared/components/Audio';
import { BasicTray } from '../../shared/components/Tray';
import { WaitingRoom } from './WaitingRoom';
// providers
import { useParticipants } from '../../shared/contexts/ParticipantsProvider';
// hooks
import { useJoinSound } from '../../shared/hooks/useJoinSound';
// styles
import styles from './Container.module.scss';

const Container: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { isOwner } = useParticipants();

  useJoinSound();

  // ────────────────────────────────────────────────────────────────────────────────

  const roomComponents = useMemo(
    () => (
      <>
        {/* Show waiting room notification & modal if call owner */}
        {isOwner && <WaitingRoom />}
        {/* Tray buttons */}
        <BasicTray />
        {/* Audio tags */}
        <Audio />
      </>
    ),
    [isOwner]
  );

  return (
    <div className={styles['room']}>
      {children}
      {roomComponents}
    </div>
  );
};

export default Container;
