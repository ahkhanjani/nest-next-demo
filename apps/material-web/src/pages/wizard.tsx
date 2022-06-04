import { GetServerSideProps, NextPage } from 'next';
import appAxios from '../axios';
// containers
import DashboardLayout from '../containers/layouts/DashboardLayout';
import WizardContainer from '../containers/pages/WizardContainer';
// types
import { MaterialSchemaObjectArray } from '@fm/types';

const CreateMaterialsPage: NextPage<CreateMaterialsPageFetchProps> = ({
  materialSchemaArray,
}) => {
  return (
    <DashboardLayout>
      <WizardContainer {...{ materialSchemaArray }} />
    </DashboardLayout>
  );
};
export default CreateMaterialsPage;

//
// ─── SSR ────────────────────────────────────────────────────────────────────────
//

// fetch material form schemas
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
