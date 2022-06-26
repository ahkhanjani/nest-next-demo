import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
// containers
import DashboardLayout from '../layouts/DashboardLayout';
import WizardContainer from '../page-containers/WizardPage';
// utils
import { generateMaterialFormSchemas } from '@fm/material-web/material-form-schema-generator';
// types
import type { MaterialFormSchema } from '@fm/material-web/types';

const CreateMaterialsPage: NextPage<CreateMaterialsPageServerSideProps> = ({
  materialFormSchemas,
}) => {
  return (
    <DashboardLayout>
      <WizardContainer {...{ materialFormSchemas }} />
    </DashboardLayout>
  );
};
export default CreateMaterialsPage;

export async function getServerSideProps({
  res,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<CreateMaterialsPageServerSideProps>
> {
  // cache the value
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=1259'
  );

  const materialFormSchemas: MaterialFormSchema[] =
    generateMaterialFormSchemas();

  return { props: { materialFormSchemas } };
}

interface CreateMaterialsPageServerSideProps {
  materialFormSchemas: MaterialFormSchema[];
}
