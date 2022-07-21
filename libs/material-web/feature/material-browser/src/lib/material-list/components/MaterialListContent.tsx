import Link from 'next/link';
// mui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// cmp
import CreateMaterialButton from './CreateMaterialButton';
import ListContainer from '../../../components/ListContainer';
import { useMaterialListService } from '../service/MaterialListServiceProvider';
import { setEditingMaterialId, useAppDispatch } from 'fm/material-web-state';

export const MaterialListContent: React.FC<MaterialListContentProps> = ({
  page,
  setPage,
}) => {
  const { data, loading } = useMaterialListService();

  // ─── Store ──────────────────────────────────────────────────────────────────────

  const dispatch = useAppDispatch();

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <ListContainer
      title="Materials"
      loading={loading}
      {...{
        page,
        setPage,
        pageCount: data ? data.materialsPaginate.pagesCount : 1,
      }}
    >
      <List>
        <CreateMaterialButton />
        {data?.materialsPaginate.materials.map(({ id, title }) => {
          return (
            <Link key={id} href={'' /* ROUTES.WIZARD */}>
              <ListItemButton
                onClick={() => {
                  dispatch(setEditingMaterialId(id));
                }}
              >
                <ListItemText primary={title} />
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </ListContainer>
  );
};

interface MaterialListContentProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
