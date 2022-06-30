import { useMemo } from 'react';
// providers
import { useCallState } from '../../shared/contexts/CallProvider';
// hooks
import { useCallUI } from '../../shared/hooks/useCallUI';
// cmp
import Room from '../Call/Room';
import Asides from './Asides';
import Modals from './Modals';
import ExpiryTimer from '../../shared/components/ExpiryTimer';
// styles
import styles from './index.module.scss';

const CoreApp: React.FC<CoreAppProps> = ({ customComponentForState }) => {
  const { roomExp, state } = useCallState();

  const componentForState = useCallUI({
    state,
    room: <Room />,
    ...customComponentForState,
  });

  // ────────────────────────────────────────────────────────────────────────────────

  // memoize children to avoid unnecessary renders from HOC
  return useMemo(
    () => (
      <>
        {roomExp && <ExpiryTimer expiry={roomExp} />}
        <div className={styles['app']}>
          {componentForState()}
          <Modals />
          <Asides />
        </div>
      </>
    ),
    [componentForState, roomExp]
  );
};
export default CoreApp;

interface CoreAppProps {
  customComponentForState: any;
}
