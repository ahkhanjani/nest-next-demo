import type {
  ChangeEventHandler,
  PropsWithChildren,
  ReactElement,
} from 'react';

const SelectInput = <
  TValue extends string | number | readonly string[] | undefined
>({
  onChange,
  value,
  variant,
  children,
  ...rest
}: PropsWithChildren<SelectInputProps<TValue>>): ReactElement => {
  return (
    <select onChange={onChange} value={value} {...rest}>
      {children}
    </select>
  );
};
export default SelectInput;

interface SelectInputProps<TValue> {
  value?: TValue;
  variant?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}
