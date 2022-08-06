import { useId } from 'react';
// mui
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
// store
import { useAppSelector } from 'fm/material-web-state';
// cmp
import StackItem from './StackItem';
import NewButton from './NewButton';

const MaterialStack: React.FC = () => {
  //
  // ─── STORE ───────────────────────────────────────────────────────
  //

  const { materialDataArray } = useAppSelector(
    (state) => state.creatingMaterials
  );

  // ────────────────────────────────────────────────────────────────────────────────

  const domId = useId();

  const stackItems = (
    <>
      {materialDataArray.map(({ title }, index) => (
        // eslint-disable-next-line react/jsx-key
        <StackItem key={`${domId}-${index}`} {...{ index, title }} />
      ))}
    </>
  );

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
        <NewButton />
        {stackItems}
      </List>
    </Paper>
  );
};
export default MaterialStack;
