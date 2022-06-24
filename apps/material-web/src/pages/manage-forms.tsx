import { NextPage } from 'next';
// containers
import DashboardLayout from '../layouts/DashboardLayout';
import ManageFormSchemaContainer from '../page-containers/ManageFormSchemaPage';

const ManageFormSchemaPage: NextPage = () => {
  return (
    <DashboardLayout>
      <ManageFormSchemaContainer />
    </DashboardLayout>
  );
};
export default ManageFormSchemaPage;
