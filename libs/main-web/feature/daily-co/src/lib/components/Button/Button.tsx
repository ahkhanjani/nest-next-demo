import { forwardRef, PropsWithChildren } from 'react';
import classnames from 'classnames';
import Link from 'next/link';

export const Button = forwardRef<PropsWithChildren<any>>(
  (
    {
      children,
      className,
      disabled = false,
      fullWidth,
      href,
      IconAfter,
      IconBefore,
      loading = false,
      size = 'medium',
      type = 'button',
      variant = 'primary',
      shadow = false,
      ...rest
    }: PropsWithChildren<ButtonProps>,
    ref,
  ) => {
    const cx = classnames('button', className, size, variant, {
      disabled,
      fullWidth,
      loading,
      shadow,
    });

    const content = (
      <>
        {IconBefore && <IconBefore style={{ marginRight: '.5em' }} />}
        {children}
        {IconAfter && <IconAfter style={{ marginLeft: '.5em' }} />}
      </>
    );

    return href ? (
      <Link href={href}>
        <a className={cx} ref={ref} {...rest}>
          {content}
        </a>
      </Link>
    ) : (
      <button
        ref={ref}
        className={cx}
        // eslint-disable-next-line react/button-has-type
        type={type || 'button'}
        disabled={disabled}
        {...rest}
      >
        {content}
      </button>
    );
  },
);
export default Button;

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  IconAfter?: React.FC<any>;
  IconBefore?: React.FC<any>;
  loading?: boolean;
  size?: string;
  type?: 'button' | 'reset' | 'submit';
  variant?: string;
  shadow?: boolean;
}
