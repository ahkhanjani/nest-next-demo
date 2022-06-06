import { useEffect, useMemo } from 'react';
import { useFormikContext } from 'formik';
// cmp
import SelectField from '../../../../../../components/form/SelectField';
// types
import type { JSONSchema7 } from 'json-schema';
import type { FormikValues } from './types/formik';
import type { MaterialSchemaObjectArray } from '@fm/types';

const TypeSelectField: React.FC<TypeSelectFieldProps> = ({
  setDynamicFormSchema: setRjsfSchema,
  materialSchemaArray,
}) => {
  const {
    values: { type },
  } = useFormikContext<FormikValues>();

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  // change form-schema when selected type changes
  useEffect(() => {
    const materialSchemaObject = materialSchemaArray.find(
      (ms) => ms.type === type
    );

    if (materialSchemaObject) setRjsfSchema(materialSchemaObject.schema);
  }, [materialSchemaArray, setRjsfSchema, type]);

  // ────────────────────────────────────────────────────────────────────────────────

  return useMemo(
    () => (
      <SelectField
        name="type"
        label="Material Type"
        data={materialSchemaArray.map(({ type }) => type)}
      />
    ),
    [materialSchemaArray]
  );
};
export default TypeSelectField;

interface TypeSelectFieldProps {
  materialSchemaArray: MaterialSchemaObjectArray;
  setDynamicFormSchema: React.Dispatch<React.SetStateAction<JSONSchema7>>;
}
