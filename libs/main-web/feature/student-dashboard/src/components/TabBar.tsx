import { useId } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  CalendarIcon,
  ChartSquareBarIcon,
  CogIcon,
  CollectionIcon,
  PencilAltIcon,
  UsersIcon,
} from '@heroicons/react/outline';

import { capitalizeFirstLetter } from 'fm/shared-utils';

export const tabs = [
  { name: 'dashboard', icon: <UsersIcon /> },
  { name: 'classroom', icon: <CollectionIcon /> },
  { name: 'calendar', icon: <CalendarIcon /> },
  { name: 'homework', icon: <PencilAltIcon /> },
  { name: 'payments', icon: <ChartSquareBarIcon /> },
  { name: 'settings', icon: <CogIcon /> },
] as const;
export type TabName = typeof tabs[number]['name'];

export const TabBar: React.FC = () => {
  const domId = useId();

  return (
    <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between">
      {tabs.map(({ name, icon }) => (
        <TabButton key={domId + name} {...{ name, icon }} />
      ))}
    </div>
  );
};
export default TabBar;

const TabButton: React.FC<{
  name: string;
  icon: JSX.Element;
}> = ({ icon, name }) => {
  const router = useRouter();
  const activeTab = router.query['tab'];

  return (
    <Link shallow href={`/?tab=${name}`}>
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
