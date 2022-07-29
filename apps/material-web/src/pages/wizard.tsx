import { GetStaticPropsResult, NextPage } from 'next';
// fm
import { DashboardLayout } from 'fm/material-web-ui';
import { generateMaterialFormSchemas } from 'fm/material-web-feature-schemagen';
import type { MaterialFormSchema } from 'fm/material-web-types';

const WizardPage: NextPage<WizardPageStaticProps> = ({
  materialFormSchemas,
}) => {
  return (
    <DashboardLayout>
      <WizardContainer {...{ materialFormSchemas }} />
    </DashboardLayout>
  );
};
export default WizardPage;

export async function getStaticProps(): Promise<
  GetStaticPropsResult<WizardPageStaticProps>
> {
  const materialFormSchemas = generateMaterialFormSchemas();
  return { props: { materialFormSchemas } };
}

interface WizardPageStaticProps {
  materialFormSchemas: MaterialFormSchema[];
}
