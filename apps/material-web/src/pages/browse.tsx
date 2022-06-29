import { NextPage } from 'next';
// containers
import DashboardLayout from '../layouts/DashboardLayout';
import BrowseContainer from '../page-containers/BrowsePage';

const BrowsePage: NextPage = () => {
  return (
    <DashboardLayout>
      <BrowseContainer />
    </DashboardLayout>
  );
};
export default BrowsePage;
