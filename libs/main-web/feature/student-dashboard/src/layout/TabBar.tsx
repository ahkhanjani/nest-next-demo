import { useId } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  CalendarIcon,
  ChartIcon,
  CogIcon,
  CategoryIcon,
  TwoUsersIcon,
  EditSquareIcon,
} from '../../../../../shared/assets/src/icons';

import { capitalizeFirstLetter } from 'fm/shared-utils';

interface TabObject {
  name: string;
  url?: string;
  icon: JSX.Element;
}

export const tabs: readonly TabObject[] = [
  { name: 'home', icon: <TwoUsersIcon /> },
  { name: 'classroom', icon: <CategoryIcon /> },
  { name: 'calendar', icon: <CalendarIcon /> },
  { name: 'homework', icon: <EditSquareIcon /> },
  { name: 'payments', icon: <ChartIcon /> },
  { name: 'settings', icon: <CogIcon /> },
];
export type TabName = typeof tabs[number]['name'];

export const TabBar: React.FC = () => {
  const domId = useId();

  return (
    <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between">
      {tabs.map((tabObj) => (
        <TabButton key={domId + tabObj.name} tabObject={tabObj} />
      ))}
    </div>
  );
};
export default TabBar;

const TabButton: React.FC<{
  tabObject: TabObject;
}> = ({ tabObject: { icon, name, url } }) => {
  const router = useRouter();
  const activeTab = router.query['desk'];
  console.log(activeTab);
  return (
    <Link href={`/dashboard/${url ?? name}`}>
      <button
        className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center  ${
          name === activeTab
            ? 'tw-bg-blue white-svg '
            : 'tw-border tw-border-borderColor'
        }`}
        title={capitalizeFirstLetter(name)}
      >
        {icon}
      </button>
    </Link>
  );
};
