import { PropsWithChildren } from 'react';
// styles
import styles from './SubmitButton.module.css';

export const SubmitButton: React.FC<PropsWithChildren<SubmitButtonProps>> = ({
  className = '',
  sx: {
    size = 'md',
    color = 'normal',
    loading = false,
    disabled = false,
    outline = false,
    wide = false,
  },
  children,
}) => {
  return (
    <button
      className={`
      tw-daisy-btn
      tw-daisy-btn-${size}
      tw-daisy-btn-${color}
      ${disabled ? 'tw-daisy-btn-disabled' : null}
      ${loading && 'tw-daisy-loading'}
      ${outline ? 'tw-daisy-btn-outline' : null}
      ${wide ? 'tw-daisy-btn-wide' : null}
      ${className}
      ${styles['submitButton']}
      `}
      type="submit"
    >
      {children}
    </button>
  );
};

interface SubmitButtonProps {
  className?: string;
  sx: {
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
  };
}
