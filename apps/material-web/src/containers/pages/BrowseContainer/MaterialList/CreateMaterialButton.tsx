import Link from 'next/link';
// mui
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// - icons
import AddIcon from '@mui/icons-material/Add';
// routes
import ROUTES from '../../../../routes';

const CreateMaterialButton: React.FC = () => {
  return (
    <ListItem disablePadding>
      {/* eslint-disable-next-line @next/next/link-passhref */}
      <Link href={ROUTES.WIZARD} shallow>
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New Material..." />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};
export default CreateMaterialButton;
