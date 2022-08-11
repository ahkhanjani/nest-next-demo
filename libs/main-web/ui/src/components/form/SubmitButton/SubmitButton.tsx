import { PropsWithChildren } from 'react';
import classNames from 'classnames';
// styles
import styles from './SubmitButton.module.css';

const cx = classNames.bind(styles);

export const SubmitButton: React.FC<PropsWithChildren<SubmitButtonProps>> = ({
  className = '',
  size,
  color,
  loading = false,
  disabled = false,
  children,
}) => {
  const buttonClassName = cx(
    'tw-daisy-btn',
    { [`tw-daisy-btn-${size}`]: size },
    { [`tw-daisy-btn-${color}`]: color },
    { 'tw-daisy-btn-disabled': disabled },
    { 'tw-daisy-btn-loading': loading },
    className,
  );

  return (
    <button className={buttonClassName} type="submit">
      {children}
    </button>
  );
};

interface SubmitButtonProps {
  className?: string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  loading?: boolean;
  disabled?: boolean;
}
