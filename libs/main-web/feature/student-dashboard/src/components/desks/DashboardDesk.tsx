import { PaperPlusIcon } from '../../assets/icons';
import Sessions from '../Sessions';

export const DashboardDesk: React.FC = () => {
  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <span className="tw-text-gray tw-text-xl tw-font-medium tw-p-4">
        Upcoming sessions
      </span>
      <div className="tw-w-fit tw-flex tw-flex-row tw-items-center tw-bg-white tw-mt-4 tw-p-4 tw-rounded-2xl tw-shadow-sm">
        <Sessions />
        <button className="tw-h-[74px] tw-w-[74px] tw-rounded-full tw-mr-3 tw-bg-field tw-flex tw-flex-col tw-items-center tw-justify-center">
          <PaperPlusIcon />
          <span className="tw-text-xs tw-font-normal tw-text-gray">Add</span>
        </button>
      </div>
    </>
  );
};
export default DashboardDesk;
