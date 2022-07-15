import { Formik, Form, type FormikHelpers } from 'formik';
import * as yup from 'yup';
// fm
import { InputField, SubmitButton } from '@fm/main-web-ui-form';
// context
import { useLoginService } from '../service/PreregServiceProvider';
// types
import type { RegFormikValues as Values } from '../types/reg-formik-values';

const validationSchema = yup.object({
  email: yup.string().email(),
});

const initialValues: Values = { email: '' };
Object.freeze(initialValues);

export const PreregForm: React.FC = () => {
  const { errors, loading, handleSubmit } = useLoginService();

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Formik
      onSubmit={(values: Values, actions: FormikHelpers<Values>) => {
        handleSubmit(values, actions);
      }}
      {...{ initialValues, validationSchema }}
    >
      <Form>
        <InputField name="email" type="email" label="Email" />
        <SubmitButton
          color={errors?.length ? 'error' : 'primary'}
          loading={loading}
        >
          Register
        </SubmitButton>
      </Form>
    </Formik>
  );
};
export default PreregForm;
