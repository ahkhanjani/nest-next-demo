// mui
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
// icons
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
// types
import type { MaterialData } from '@fm/types';

const MaterialStack: React.FC<NewMaterialStackerProps> = ({
  materialDataArray,
  setMaterialDataArray,
  selectedMaterialIndex,
  setSelectedMaterialIndex,
}) => {
  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  /**
   * Handles clicking on a list item.
   * @param index Index of the clicked item. Value `-1` for new material tab.
   */
  function handleItemClick(index: number) {
    setSelectedMaterialIndex(index);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
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
            <ListItemText primary="New..." />
          </ListItemButton>
        </ListItem>
        {materialDataArray?.map(({ title }, index) => (
          <ListItem
            key={title}
            selected={selectedMaterialIndex === index}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
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
  );
};
export default MaterialStack;

interface NewMaterialStackerProps {
  materialDataArray: MaterialData[];
  setMaterialDataArray: React.Dispatch<React.SetStateAction<MaterialData[]>>;
  selectedMaterialIndex: number;
  setSelectedMaterialIndex: React.Dispatch<React.SetStateAction<number>>;
}
