import { NextPage } from 'next';
// containers
import DashboardLayout from '@fm/material-web-lib/layouts/DashboardLayout';
import WizardContainer from '@fm/material-web-lib/pages/WizardPage';

const CreateMaterialsPage: NextPage = () => {
  return (
    <DashboardLayout>
      <WizardContainer />
    </DashboardLayout>
  );
};
export default CreateMaterialsPage;
