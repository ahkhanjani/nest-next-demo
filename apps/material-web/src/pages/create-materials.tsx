import { NextPage } from 'next';
// containers
import DashboardLayout from '../containers/layouts/DashboardLayout';
import MaterialWizardContainer from '../containers/pages/MaterialWizardContainer';

const CreateMaterialsPage: NextPage = () => {
  return (
    <DashboardLayout>
      <MaterialWizardContainer />
    </DashboardLayout>
  );
};
export default CreateMaterialsPage;
