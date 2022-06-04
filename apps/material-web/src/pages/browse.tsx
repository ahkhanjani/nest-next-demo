import { NextPage } from 'next';
// containers
import DashboardLayout from '../containers/layouts/DashboardLayout';
import BrowseContainer from '../containers/pages/BrowseContainer';

const BrowsePage: NextPage = () => {
  return (
    <DashboardLayout>
      <BrowseContainer />
    </DashboardLayout>
  );
};
export default BrowsePage;
