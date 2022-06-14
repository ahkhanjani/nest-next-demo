import { NextPage } from 'next';
// containers
import DashboardLayout from '@fm/material-web-lib/layouts/DashboardLayout';
import BrowseContainer from '@fm/material-web-lib/pages/BrowsePage';

const BrowsePage: NextPage = () => {
  return (
    <DashboardLayout>
      <BrowseContainer />
    </DashboardLayout>
  );
};
export default BrowsePage;
