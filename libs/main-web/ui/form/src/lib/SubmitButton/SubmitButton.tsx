import { PropsWithChildren } from 'react';
// styles
import styles from './SubmitButton.module.scss';

const SubmitButton: React.FC<PropsWithChildren<SubmitButtonProps>> = ({
  // TODO handle loading progress bar
  loading = false,
  children,
}) => {
  return (
    <button className={styles['submitButton']} type="submit">
      {children}
    </button>
  );
};
export default SubmitButton;

interface SubmitButtonProps {
  loading?: boolean;
}
