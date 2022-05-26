import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
// types
import { MaterialData } from '../../types';

const MaterialStack: React.FC<NewMaterialStackerProps> = ({
  materialDataArray,
  setMaterialDataArray,
  selectedMaterialIndex,
  setSelectedMaterialIndex,
}) => {
  /**
   * Handles clicking on a list item.
   * @param index Index of the clicked item. Value `-1` for new material tab.
   */
  function handleItemClick(index: number) {
    setSelectedMaterialIndex(index);
  }

  return (
    <>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
        }}
      >
        <List>
          <ListItem selected={selectedMaterialIndex === -1} disablePadding>
            <ListItemButton
              onClick={() => {
                handleItemClick(-1);
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary='New...' />
            </ListItemButton>
          </ListItem>
          {materialDataArray?.map(({ title }, index) => (
            <ListItem
              key={title}
              selected={selectedMaterialIndex === index}
              secondaryAction={
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  handleItemClick(index);
                }}
              >
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
};
export default MaterialStack;

interface NewMaterialStackerProps {
  materialDataArray: MaterialData[];
  setMaterialDataArray: React.Dispatch<React.SetStateAction<MaterialData[]>>;
  selectedMaterialIndex: number;
  setSelectedMaterialIndex: React.Dispatch<React.SetStateAction<number>>;
}
