import { forwardRef } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';

export const Button = forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      fullWidth,
      href,
      IconAfter = null,
      IconBefore = null,
      loading = false,
      size = 'medium',
      type = 'button',
      variant = 'primary',
      shadow = false,
      ...rest
    },
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

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  IconAfter: PropTypes.node,
  IconBefore: PropTypes.node,
  loading: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  variant: PropTypes.string,
  shadow: PropTypes.bool,
};

export default Button;
