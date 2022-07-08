import { Formik } from 'formik';
import { withFormik } from '@bbbtech/storybook-formik';
// import './tailwind-imports.css';

export const parameters = {
  controls: {
    expanded: true,
  },
};

export const decorators = [
  withFormik,
  (Story: React.FC) => (
    <Formik
      initialValues={{}}
      onSubmit={() => {
        console.log('Global config Formik..');
      }}
    >
      <Story />
    </Formik>
  ),
];
