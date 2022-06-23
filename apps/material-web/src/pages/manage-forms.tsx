import { NextPage } from 'next';
// containers
import DashboardLayout from '@fm/material-web-lib/layouts/DashboardLayout';
import ManageFormSchemaContainer from '@fm/material-web-lib/pages/ManageFormSchemaPage';

const ManageFormSchemaPage: NextPage = () => {
  return (
    <DashboardLayout>
      <ManageFormSchemaContainer />
    </DashboardLayout>
  );
};
export default ManageFormSchemaPage;
