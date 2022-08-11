import { createContext, PropsWithChildren } from 'react';

const FormSchemaContext = createContext();

const FormSchemaProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  await Promise.all(
    files.map(async (file) => {
      try {
        createdSchemas.push(createdMaterialFormSchema);
      } catch (error) {
        errorFileNames.push(file.filename);
      }
    }),
  );

  return (
    <FormSchemaContext.Provider value={}>{children}</FormSchemaContext.Provider>
  );
};
export default FormSchemaProvider;
