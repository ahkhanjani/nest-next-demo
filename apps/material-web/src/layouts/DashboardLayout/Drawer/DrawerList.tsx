import { useRouter } from 'next/router';
import Link from 'next/link';
// mui
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
// - icons
import CategoryIcon from '@mui/icons-material/Category';
// routes
import ROUTES from '../../../routes';

export const DrawerList: React.FC = () => {
  const { route } = useRouter();

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <List component="nav">
      {/* eslint-disable-next-line @next/next/link-passhref */}
      <Link href={ROUTES.BROWSE}>
        <ListItemButton selected={route === ROUTES.BROWSE}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="View Materials" />
        </ListItemButton>
      </Link>
    </List>
  );
};
export default DrawerList;
