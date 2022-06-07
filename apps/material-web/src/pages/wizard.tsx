import { NextPage } from 'next';
// containers
import DashboardLayout from '../containers/layouts/DashboardLayout';
import WizardContainer from '../containers/pages/WizardContainer';

const CreateMaterialsPage: NextPage = () => {
  return (
    <DashboardLayout>
      <WizardContainer />
    </DashboardLayout>
  );
};
export default CreateMaterialsPage;
