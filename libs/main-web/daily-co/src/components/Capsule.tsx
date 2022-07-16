import { PropsWithChildren } from 'react';
// styles
import styles from './Capsule.module.scss';

const Capsule: React.FC<PropsWithChildren<CapsuleProps>> = ({
  children,
  variant,
}) => (
  <span className={`${styles['capsule']} ${styles[`capsule.${variant}`]}`}>
    {children}
  </span>
);
export default Capsule;

// ────────────────────────────────────────────────────────────────────────────────

interface CapsuleProps {
  variant: CapsuleVariant;
}

type CapsuleVariant = 'success' | 'warning' | 'error' | 'info';
