import { useField } from 'formik';
// styles
import styles from './InputField.module.scss';

const InputField: React.FC<InputFieldProps> = ({ name, type, label }) => {
  const [field, meta] = useField({ name, type });

  return (
    <>
      <label className={styles.label}>
        {label}
        <input
          className={`daisy-input daisy-input-bordered ${styles.input} ${type}`}
          {...{ name, type }}
          {...field}
        />
      </label>
      {meta.touched && meta.error ? (
        <div className={styles.errorBox}>
          <span className={styles.errorText}>{meta.error}</span>
        </div>
      ) : null}
    </>
  );
};
export default InputField;

interface InputFieldProps {
  name: string;
  type: 'text' | 'password' | 'email';
  label: string;
}
