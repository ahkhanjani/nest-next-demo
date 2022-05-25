import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
// gql
import { useGetMaterialSchemaArrayQuery } from 'graphql/generated';
// cmp
import SelectField from '~components/form/SelectField';
// types
import { JSONSchema7 } from 'json-schema';
import type { FormikValues, MaterialSchemaObjectArray } from '../types';
import { Skeleton } from '@mui/material';

const TypeSelectField: React.FC<TypeSelectFieldProps> = ({ setRjsfSchema }) => {
  const {
    values: { type },
  } = useFormikContext<FormikValues>();

  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [schemas, setSchemas] = useState<JSONSchema7[]>([]);
  const [schemaTypeNames, setSchemaTypeNames] = useState<string[]>([]);

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const {
    data: { materialSchemaArray: strSchemaArray } = {},
    loading: schemaArrayLoading,
    error: schemaArrayError,
  } = useGetMaterialSchemaArrayQuery();

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  useEffect(() => {
    if (strSchemaArray) {
      const parsedSchemaArray: MaterialSchemaObjectArray =
        JSON.parse(strSchemaArray);
      const thisNames: string[] = [];
      const thisSchemas: JSONSchema7[] = [];

      parsedSchemaArray.forEach(({ type, schema }) => {
        thisNames.push(type);
        thisSchemas.push(schema);
      });
      setSchemaTypeNames(thisNames);
      setSchemas(thisSchemas);
    }
  }, [strSchemaArray]);

  useEffect(() => {
    if (schemaArrayError) console.error('Error loading material schemas.');
  }, [schemaArrayError]);

  // change form-schema when selected type changes
  useEffect(() => {
    // find the index of selected type in schema array
    const schemaIndex: number = schemaTypeNames.findIndex(
      (name) => name === type
    );

    // get the schema at the index
    const materialSchema: JSONSchema7 = schemas[schemaIndex];

    //set the schema of the dynamic form
    if (materialSchema) setRjsfSchema(materialSchema);
  }, [type, schemaTypeNames, schemas]);

  // ────────────────────────────────────────────────────────────────────────────────

  if (schemaArrayLoading) return <Skeleton variant='rectangular' />;

  return (
    <SelectField name='type' label='Material Type' data={schemaTypeNames} />
  );
};
export default TypeSelectField;

interface TypeSelectFieldProps {
  setRjsfSchema: React.Dispatch<React.SetStateAction<JSONSchema7>>;
}
