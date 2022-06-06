import { useCallback, useEffect, useMemo } from 'react';
import { useFormikContext } from 'formik';
// gql
import { useCheckMaterialTitleExistsLazyQuery } from '@fm/gql';
// cmp
import InputField from '../../../../../../components/form/InputField';
// types
import type { FormikValues } from './types/formik';
// store
import { useAppSelector } from '../../../../../../hooks';

const TitleInputField: React.FC = () => {
  const { values, isValidating, setFieldError, errors } =
    useFormikContext<FormikValues>();

  //
  // ─── STORE ───────────────────────────────────────────────────────
  //

  const { materialDataArray, selectedMaterialIndex } = useAppSelector(
    (state) => state.creatingMaterials
  );

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const [getTitleExists] = useCheckMaterialTitleExistsLazyQuery();

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  /**
   * Checks the local list and the server database for a duplicate title.
   * @returns true if title already exists.
   */
  const checkTitleExists = useCallback(async (): Promise<boolean> => {
    //* 1. check if exists in current local list
    // search in local list
    const titleExistsInCurrentList = materialDataArray.find(
      ({ title }) => values.title === title
    );
    // if title already exists set titleExists to true
    if (titleExistsInCurrentList) return true;

    //* 2. check if exists in database
    // query the database
    getTitleExists({
      variables: { title: values.title },
    })
      .then(
        // if title already exists set titleExists to true
        ({ data: { materialTitleExists } }) => {
          if (materialTitleExists) return true;
        }
      )
      .catch((error) => {
        console.error(error);
        setFieldError('title', "Couldn't connect. Please try again later.");
      });

    return false;
  }, [materialDataArray, values.title, getTitleExists, setFieldError]);

  const validate = useCallback(async (): Promise<void> => {
    //* check for existing title if:
    const titleExists: boolean =
      //* 1. creating a new material
      selectedMaterialIndex === -1 ||
      //* 2. editing a local material and the title has changed
      (selectedMaterialIndex >= 0 &&
        values.title !== materialDataArray.at(selectedMaterialIndex)?.title)
        ? await checkTitleExists()
        : false;

    if (titleExists && !errors.title)
      setFieldError('title', 'Title already exists.');
  }, [
    checkTitleExists,
    errors.title,
    materialDataArray,
    selectedMaterialIndex,
    setFieldError,
    values.title,
  ]);

  useEffect(() => {
    if (isValidating) validate();
  }, [isValidating, validate]);

  // ────────────────────────────────────────────────────────────────────────────────

  return useMemo(
    () => <InputField name="title" label="Material Title" type="text" />,
    []
  );
};
export default TitleInputField;
