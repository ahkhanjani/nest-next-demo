import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '~app/index';

/**  the `!` operator at the end means we are sure
 * that the retured value by `document.getElementById`
 * is never null.
 */
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
