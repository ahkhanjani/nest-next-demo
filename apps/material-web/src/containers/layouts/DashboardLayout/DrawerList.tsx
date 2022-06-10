import { useRouter } from 'next/router';
import Link from 'next/link';
// mui
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
// - icons
import CategoryIcon from '@mui/icons-material/Category';
import FeedIcon from '@mui/icons-material/Feed';
// routes
import ROUTES from '../../../routes';

export const MainListItems: React.FC = () => {
  const { route } = useRouter();

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* eslint-disable-next-line @next/next/link-passhref */}
      <Link href={ROUTES.BROWSE}>
        <ListItemButton selected={route === ROUTES.BROWSE}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="View Materials" />
        </ListItemButton>
      </Link>
      {/* eslint-disable-next-line @next/next/link-passhref */}
      <Link href={ROUTES.FORM_SCHEMA}>
        <ListItemButton selected={route === ROUTES.FORM_SCHEMA}>
          <ListItemIcon>
            <FeedIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Forms" />
        </ListItemButton>
      </Link>
    </>
  );
};

export const secondaryListItems = (
  <>
    {/* <ListSubheader component='div' inset>
      Report
    </ListSubheader>
    <ListItemButton disabled>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Notifications' />
    </ListItemButton>
    <ListItemButton disabled>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Logs' />
    </ListItemButton> */}
  </>
);

const DrawerList: React.FC = () => {
  return (
    <List component="nav">
      <MainListItems />
      <Divider sx={{ my: 1 }} />
      {secondaryListItems}
    </List>
  );
};
export default DrawerList;
