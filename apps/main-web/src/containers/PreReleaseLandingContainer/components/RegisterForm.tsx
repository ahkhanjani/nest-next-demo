import InputField from '../../../components/InputField';
import SubmitButton from '../../../components/SubmitButton';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import * as yup from 'yup';
import { useCreatePreRegMutation } from '@fm/gql';

const initialValues: Values = { email: '' };

const validationSchema = yup.object({
  email: yup.string().email(),
});

const RegisterForm: React.FC = () => {
  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const [createRegisteration, { loading }] = useCreatePreRegMutation();

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  async function handleSubmit(values: Values, actions: FormikHelpers<Values>) {
    try {
      const res = await createRegisteration({ variables: values });

      // TODO handle response
      console.log(res);
    } catch (err) {
      // TODO handle error
      console.error(err);
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Formik
      onSubmit={(values, actions) => handleSubmit(values, actions)}
      {...{ initialValues, validationSchema }}
    >
      {(props: FormikProps<Values>) => (
        <Form>
          <InputField name="email" type="email" label="Email" />
          <SubmitButton {...{ loading }}>Send</SubmitButton>
        </Form>
      )}
    </Formik>
  );
};
export default RegisterForm;

interface Values {
  email: string;
}
