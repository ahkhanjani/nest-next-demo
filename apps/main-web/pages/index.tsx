import type { NextPage } from 'next';
import Link from 'next/link';

const IndexPage: NextPage = () => {
  return (
    <div className="tw-grid tw-h-screen tw-place-items-center">
      <Link href={'dashboard'}>
        <button className="tw-daisy-btn">Student Dashboard</button>
      </Link>
    </div>
  );
};
export default IndexPage;
