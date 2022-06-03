import { GetServerSideProps, NextPage } from 'next';
import appAxios from '../axios';
// containers
import DashboardLayout from '../containers/layouts/DashboardLayout';
import MaterialWizardContainer from '../containers/pages/MaterialWizardContainer';
// types
import { MaterialSchemaObjectArray } from '@fm/types';

const CreateMaterialsPage: NextPage<CreateMaterialsPageFetchProps> = ({
  materialSchemaArray,
}) => {
  return (
    <DashboardLayout>
      <MaterialWizardContainer {...{ materialSchemaArray }} />
    </DashboardLayout>
  );
};
export default CreateMaterialsPage;

export const getServerSideProps: GetServerSideProps<
  CreateMaterialsPageFetchProps
> = async () => {
  try {
    const res = await appAxios('/material-form-schema/schema-array');
    const materialSchemaArray: MaterialSchemaObjectArray = res.data;
    return { props: { materialSchemaArray } };
  } catch (error) {
    console.error(`Error loading material schemas.\n${error}`);
    return { notFound: true };
  }
};

interface CreateMaterialsPageFetchProps {
  materialSchemaArray: MaterialSchemaObjectArray;
}
