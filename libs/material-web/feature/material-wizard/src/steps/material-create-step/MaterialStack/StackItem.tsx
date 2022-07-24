// mui
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// icons
import DeleteIcon from '@mui/icons-material/Delete';
// store
import {
  useAppSelector,
  useAppDispatch,
  removeMaterialData,
  setSelectedMaterialIndex,
} from 'fm/material-web-state';

const StackItem: React.FC<StackItemProps> = ({ index, title }) => {
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

  /**
   * Deletes one item from the list.
   * @param index Index of the clicked item.
   */
  function handleDelete(index: number) {
    dispatch(removeMaterialData(index));
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <ListItem
      selected={selectedMaterialIndex === index}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            handleDelete(index);
          }}
        >
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
  );
};
export default StackItem;

interface StackItemProps {
  index: number;
  title: string;
}
