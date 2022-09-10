import { useMemo } from 'react';
import ExpiryTimer from '../ExpiryTimer';
import { useCallState } from '../../contexts/CallProvider';
import { useCallUI } from '../../hooks/useCallUI';

import PropTypes from 'prop-types';
import Room from '../Call/Room';
import { Asides } from './Asides';
import { Modals } from './Modals';

export const App = ({ customComponentForState }) => {
  const { roomExp, state } = useCallState();

  const componentForState = useCallUI({
    state,
    room: <Room />,
    ...customComponentForState,
  });

  // Memoize children to avoid unnecessary renders from HOC
  return useMemo(
    () => (
      <>
        {roomExp && <ExpiryTimer expiry={roomExp} />}
        <div className="app">
          {componentForState()}
          <Modals />
          <Asides />
        </div>
      </>
    ),
    [componentForState, roomExp],
  );
};

App.propTypes = {
  customComponentForState: PropTypes.any,
};

export default App;