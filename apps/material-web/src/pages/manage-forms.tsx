import { NextPage } from 'next';
// containers
import DashboardLayout from '../containers/layouts/DashboardLayout';
import ManageFormSchemaContainer from '../containers/pages/ManageFormSchemaContainer';

const ManageFormSchemaPage: NextPage = () => {
  return (
    <DashboardLayout>
      <ManageFormSchemaContainer />
    </DashboardLayout>
  );
};
export default ManageFormSchemaPage;
