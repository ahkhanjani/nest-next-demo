import { NextPage } from 'next';
// containers
import ClassroomContainer from '../../page-containers/ClassroomPage';
import { useRouter } from 'next/router';

const ClassroomPage: NextPage = () => {
  //
  // ─── ROUTER ─────────────────────────────────────────────────────────────────────
  //

  const router = useRouter();
  const { id } = router.query;

  // ────────────────────────────────────────────────────────────────────────────────

  return <ClassroomContainer roomId={id} />;
};
export default ClassroomPage;
