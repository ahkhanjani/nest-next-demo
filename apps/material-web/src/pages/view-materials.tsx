import { NextPage } from 'next';
// containers
import DashboardLayout from 'containers/layouts/DashboardLayout';
import MaterialViewerContainer from 'containers/pages/MaterialViewerContainer';

const ViewMaterialsPage: NextPage = () => {
  return (
    <DashboardLayout>
      <MaterialViewerContainer />
    </DashboardLayout>
  );
};
export default ViewMaterialsPage;
