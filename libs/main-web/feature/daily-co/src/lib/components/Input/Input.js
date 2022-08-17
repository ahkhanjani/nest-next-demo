import { useState, forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const InputContainer = ({ children, prefix, className }) => (
  <div className={className}>
    {prefix && <span>{prefix}</span>}
    {children}
  </div>
);

InputContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  prefix: PropTypes.string,
};

export const TextInput = forwardRef(
  ({ onChange, prefix, variant, ...rest }, ref) => {
    const cx = classNames('input-container', variant, { prefix });

    return (
      <InputContainer className={cx} prefix={prefix}>
        <input type="text" onChange={onChange} ref={ref} {...rest} />
      </InputContainer>
    );
  },
);

TextInput.propTypes = {
  onChange: PropTypes.func,
  prefix: PropTypes.string,
  variant: PropTypes.string,
};

export const BooleanInput = ({
  value = false,
  onChange = () => null,
  disabled = false,
  ...rest
}) => {
  const [checked, setChecked] = useState(value);

  return (
    // eslint-disable-next-line
    <label disabled={disabled}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          setChecked(!checked);
          onChange(e);
        }}
        {...rest}
      />
      <span>
        <div />
      </span>

      <style jsx>{`
        position: relative;
        display: inline-block;
        width: 48px;
        height: 26px;
        user-select: none;
        outline: none;

        input {
          opacity: 0;
          width: 0;
          height: 0;
          outline: none;
        }

        input:checked,
        input:focused {
          outline: none;
          box-shadow: none;
        }

        input:checked + span {
          background-color: var(--green-default);
          border-color: var(--green-dark);
        }

        input:checked + span > div {
          transform: translateX(22px);
        }

        & > span {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--gray-light);
          border: 1px solid var(--gray-default);
          transition: 0.4s;
          border-radius: 26px;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
        }

        & > span:hover {
          border-color: var(--gray-dark);
        }

        & > span > div {
          background-color: white;
          position: absolute;
          height: 20px;
          width: 20px;
          left: 2px;
          bottom: 2px;
          transition: 0.4s;
          border-radius: 50%;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1),
            0px 0px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </label>
  );
};

BooleanInput.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.bool,
  label: PropTypes.string,
};

export const SelectInput = ({
  onChange,
  value,
  variant,
  children,
  ...rest
}) => {
  const cx = classNames('input-container', variant);

  return (
    <InputContainer className={cx}>
      <select onChange={onChange} value={value} {...rest}>
        {children}
      </select>
    </InputContainer>
  );
};

SelectInput.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.node,
  value: PropTypes.any,
  variant: PropTypes.string,
  label: PropTypes.string,
};

export default TextInput;
