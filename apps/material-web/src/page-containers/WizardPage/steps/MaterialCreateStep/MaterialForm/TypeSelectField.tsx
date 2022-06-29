import { useEffect } from 'react';
import { useFormikContext } from 'formik';
// cmp
import SelectField from '../../../../../components/form/SelectField';
// types
import type { JSONSchema7 } from 'json-schema';
import type { FormikValues } from './types/formik';
import { MaterialFormSchema } from '@fm/material-web/types';

const TypeSelectField: React.FC<TypeSelectFieldProps> = ({
  setDynamicFormSchema: setRjsfSchema,
  materialFormSchemas,
}) => {
  const {
    values: { type },
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
        const parsedSchema: JSONSchema7 = selectedSchema.schema;
        setRjsfSchema(parsedSchema);
      }
    }
    handleChange();
  }, [materialFormSchemas, setRjsfSchema, type]);

  // ────────────────────────────────────────────────────────────────────────────────

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
  materialFormSchemas: MaterialFormSchema[];
}
