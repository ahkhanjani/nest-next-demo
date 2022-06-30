import { useMemo } from 'react';
// cmp
import HeaderCapsule from '../../shared/components/HeaderCapsule';
// providers
import { useParticipants } from '../../shared/contexts/ParticipantsProvider';
import { useUIState } from '../../shared/contexts/UIStateProvider';
// styles
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { participantCount } = useParticipants();
  const { customCapsule } = useUIState();

  // ────────────────────────────────────────────────────────────────────────────────

  return useMemo(
    () => (
      <header className={styles['room-header']}>
        <img
          src="/assets/daily-logo.svg"
          alt="Daily"
          className={styles['logo']}
          width="80"
          height="32"
        />

        <HeaderCapsule>{process.env.PROJECT_TITLE}</HeaderCapsule>
        <HeaderCapsule>
          {`${participantCount} ${
            participantCount === 1 ? 'participant' : 'participants'
          }`}
        </HeaderCapsule>
        {customCapsule && (
          <HeaderCapsule variant={customCapsule.variant}>
            {customCapsule.variant === 'recording' && <span />}
            {customCapsule.label}
          </HeaderCapsule>
        )}
      </header>
    ),
    [participantCount, customCapsule]
  );
};
export default Header;
