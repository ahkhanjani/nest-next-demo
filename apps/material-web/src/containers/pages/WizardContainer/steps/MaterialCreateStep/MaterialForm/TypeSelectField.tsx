import { memo, useEffect } from 'react';
import { useFormikContext } from 'formik';
// cmp
import SelectField from '../../../../../../components/form/SelectField';
// types
import type { JSONSchema7 } from 'json-schema';
import type { FormikValues } from './types/formik';
import { useGetMaterialFormSchemasQuery } from '@fm/gql';

const TypeSelectField: React.FC<TypeSelectFieldProps> = ({
  setDynamicFormSchema: setRjsfSchema,
}) => {
  const {
    values: { type },
  } = useFormikContext<FormikValues>();

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const { data: { materialFormSchemas } = {} } =
    useGetMaterialFormSchemasQuery();

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  // change form-schema when selected type changes
  useEffect(() => {
    const selectedSchema = materialFormSchemas.find(
      (schema) => schema.title === type
    );
    if (selectedSchema) {
      const parsedSchema: JSONSchema7 = JSON.parse(selectedSchema.strSchema);
      setRjsfSchema(parsedSchema);
    }
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
export default memo(TypeSelectField);

interface TypeSelectFieldProps {
  setDynamicFormSchema: React.Dispatch<React.SetStateAction<JSONSchema7>>;
}
