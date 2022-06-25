import { useEffect } from 'react';
import { useFormikContext } from 'formik';
// mui
import Skeleton from '@mui/material/Skeleton';
// cmp
import SelectField from '../../../../../components/form/SelectField';
// types
import type { JSONSchema7 } from 'json-schema';
import type { FormikValues } from './types/formik';

const TypeSelectField: React.FC<TypeSelectFieldProps> = ({
  setDynamicFormSchema: setRjsfSchema,
}) => {
  const {
    values: { type },
    setFieldError,
  } = useFormikContext<FormikValues>();

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  // change form-schema when selected type changes
  useEffect(() => {
    function handleChange() {
      if (!materialFormSchemas) return;

      const selectedSchema = materialFormSchemas.find(
        (schema) => schema.title === type
      );
      if (selectedSchema) {
        const parsedSchema: JSONSchema7 = JSON.parse(selectedSchema.strSchema);
        setRjsfSchema(parsedSchema);
      }
    }
    handleChange();
  }, [materialFormSchemas, setRjsfSchema, type]);

  // ────────────────────────────────────────────────────────────────────────────────

  if (materialFormSchemasLoading) return <Skeleton variant="rectangular" />;

  return (
    <SelectField
      name="type"
      label="Material Type"
      data={materialFormSchemas.map(({ title }) => title)}
    />
  );
};
export default TypeSelectField;

interface TypeSelectFieldProps {
  setDynamicFormSchema: React.Dispatch<React.SetStateAction<JSONSchema7>>;
}
