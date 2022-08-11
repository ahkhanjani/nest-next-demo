import { useField } from 'formik';
// fm
import { capitalizeFirstLetter } from 'fm/shared-utils';
// styles
import styles from './InputField.module.css';

export const InputField: React.FC<InputFieldProps> = ({
  name,
  type = 'text',
  label = capitalizeFirstLetter(name),
  placeholder = '',
}) => {
  const [field, meta] = useField({ name, type });

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <div className={styles['inputField']}>
      <label className={`tw-daisy-input-group ${styles['label']}`}>
        <span className={styles['firstLabelText']}>{label}</span>
        <input
          className={`tw-daisy-input tw-daisy-input-bordered ${styles['input']} ${type}`}
          type={type}
          placeholder={placeholder}
          {...field}
        />
      </label>
      {meta.touched && meta.error ? (
        <div className={styles['errorBox']}>
          <span className={styles['error-text']}>{meta.error}</span>
        </div>
      ) : null}
    </div>
  );
};

interface InputFieldProps {
  name: string;
  type?: 'text' | 'password' | 'email';
  label?: string;
  placeholder?: string;
}
