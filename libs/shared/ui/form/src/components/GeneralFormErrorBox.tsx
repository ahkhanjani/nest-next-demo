import { useId } from 'react';
// styles
import styles from './GeneralFormErrorBox.module.css';
// types
import type { UnpredictedFormErrors } from '@fm/shared-types';

export const GeneralFormErrorBox: React.FC<GeneralFormErrorBoxProps> = ({
  errors,
}) => {
  const domId = useId();

  return (
    <div id={domId} className={styles['container']}>
      <ul className={styles['errorList']}>
        {errors.map((err) => (
          <li key={err.toString()} className={styles['errorListItem']}>
            {err.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeneralFormErrorBox;

interface GeneralFormErrorBoxProps {
  errors: UnpredictedFormErrors[];
}
