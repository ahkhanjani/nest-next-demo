import { createContext, PropsWithChildren } from 'react';

const FormSchemaContext = createContext();

const FormSchemaProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <FormSchemaContext.Provider value={}>{children}</FormSchemaContext.Provider>
  );
};
export default FormSchemaProvider;
