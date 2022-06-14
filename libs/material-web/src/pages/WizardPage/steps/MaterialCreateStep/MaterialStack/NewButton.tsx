// mui
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// icons
import AddIcon from '@mui/icons-material/Add';
// store
import { useAppSelector, useAppDispatch } from '../../../../../hooks';
import { setSelectedMaterialIndex } from '../../../../../store/creating-materials';

const NewButton: React.FC = () => {
  //
  // ─── STORE ───────────────────────────────────────────────────────
  //

  const { selectedMaterialIndex } = useAppSelector(
    (state) => state.creatingMaterials
  );

  const dispatch = useAppDispatch();

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  /**
   * Handles clicking on a list item.
   * @param index Index of the clicked item. Value `-1` for new material tab.
   */
  function handleItemClick(index: number) {
    dispatch(setSelectedMaterialIndex(index));
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
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
  );
};
export default NewButton;
