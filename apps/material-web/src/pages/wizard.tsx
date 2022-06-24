import { NextPage } from 'next';
// containers
import DashboardLayout from '../layouts/DashboardLayout';
import WizardContainer from '../page-containers/WizardPage';

const CreateMaterialsPage: NextPage = () => {
  return (
    <DashboardLayout>
      <WizardContainer />
    </DashboardLayout>
  );
};
export default CreateMaterialsPage;
