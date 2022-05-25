import { useRouter } from 'next/router';
// mui
import CategoryIcon from '@mui/icons-material/Category';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
// - icons
import ListItemText from '@mui/material/ListItemText';
// types
import { Pathnames } from 'types';

export const MainListItems: React.FC = () => {
  const router = useRouter();

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <ListItemButton
        selected={router.route === Pathnames.VIEW_MATERIALS}
        onClick={() => router.push(Pathnames.VIEW_MATERIALS)}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="View Materials" />
      </ListItemButton>
      {/* <Link
          underline='none'
          color='inherit'
          variant='inherit'
          href='***PUT LINK HERE***'
        >
          <ListItemButton>
            <ListItemIcon>
              <FileUploadIcon />
            </ListItemIcon>
            <ListItemText primary='Upload...' />
          </ListItemButton>
        </Link> */}
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
