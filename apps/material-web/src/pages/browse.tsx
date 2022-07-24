import { NextPage } from 'next';
// containers
import DashboardLayout from '../layouts/DashboardLayout';
import { MaterialBrowser } from 'fm/material-web-feature-material-browser';

const BrowsePage: NextPage = () => {
  return (
    <DashboardLayout>
      <MaterialBrowser />
    </DashboardLayout>
  );
};
export default BrowsePage;
