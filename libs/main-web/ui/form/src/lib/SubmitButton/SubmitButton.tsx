import { PropsWithChildren } from 'react';
import classNames from 'classnames';
// styles
import styles from './SubmitButton.module.css';

export const SubmitButton: React.FC<PropsWithChildren<SubmitButtonProps>> = ({
  className = '',
  size,
  color,
  loading = false,
  disabled = false,
  outline = false,
  wide = false,
  children,
}) => {
  const buttonClassName = classNames(
    'tw-daisy-btn',
    { [`tw-daisy-btn-${size}`]: size },
    { [`tw-daisy-btn-${color}`]: color },
    { 'tw-daisy-btn-disabled': disabled },
    { 'tw-daisy-btn-loading': loading },
    { 'tw-daisy-btn-outline': outline },
    { 'tw-daisy-btn-wide': wide },
    className,
    styles['submitButton']
  );

  // ────────────────────────────────────────────────────────────────────────────────

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
    | 'normal'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'ghost'
    | 'link'
    | 'glass';
  loading?: boolean;
  disabled?: boolean;
  outline?: boolean;
  wide?: boolean;
}
