import { useNavigate, useLocation } from 'react-router-dom';
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Category as CategoryIcon,
  // FileUpload as FileUploadIcon,
} from '@mui/icons-material';
// types
import { Pathnames } from 'types';

export const MainListItems: React.FC = () => {
  // ____ router ____
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <ListItemButton
        selected={path === Pathnames.VIEW_MATERIALS}
        onClick={() => navigate(Pathnames.VIEW_MATERIALS)}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary='View Materials' />
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
    <List component='nav'>
      <MainListItems />
      <Divider sx={{ my: 1 }} />
      {secondaryListItems}
    </List>
  );
};
export default DrawerList;
