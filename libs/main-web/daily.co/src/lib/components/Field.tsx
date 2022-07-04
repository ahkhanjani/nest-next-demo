import type { PropsWithChildren } from 'react';
// styles
import styles from './Field.module.scss';

const Field: React.FC<PropsWithChildren<FieldProps>> = ({
  label,
  children,
}) => (
  <div className={styles['field']}>
    {label && <div className={styles['label']}>{label}</div>}
    <div className={styles['field']}>{children}</div>
  </div>
);
export default Field;

interface FieldProps {
  label?: string;
}
