import { useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { capitalizeFirstLetter } from 'fm/shared-utils';
import { tabs } from './TabBar';

import { LogoHorizontal, LogoVertical } from '../assets/icons';

export const Sidebar: React.FC = () => {
  const domId = useId();

  return (
    <div className="tw-h-screen tw-bg-white tw-px-4 tw-flex tw-flex-col tw-items-center tw-shadow-[2px_0px_1px_rgba(0,0,0,0.1)]">
      <div className="tw-mt-8 tw-block 2xl:tw-hidden">
        <LogoVertical />
      </div>
      <div className="tw-mt-8 tw-hidden 2xl:tw-block">
        <LogoHorizontal />
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-my-12 tw-border-t-4 tw-border-field tw-py-4 2xl:tw-w-40">
        {tabs.map(({ name, icon }) => (
          <TabButton key={domId + name} {...{ name, icon }} />
        ))}
      </div>
      <div className="tw-border-[3px] tw-border-blue tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-[42px] tw-h-[42px] ">
        <Image
          src="/jpg/avatar-test.jpg"
          alt="avatar"
          width={42}
          height={42}
          className="tw-rounded-full tw-object-cover"
        />
      </div>
    </div>
  );
};
export default Sidebar;

const TabButton: React.FC<{
  name: string;
  icon: JSX.Element;
}> = ({ icon, name }) => {
  const router = useRouter();
  const activeTab = router.query['desk'];

  const title = capitalizeFirstLetter(name);

  return (
    <Link shallow href={`/dashboard/${name}`}>
      <button
        className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
        title={title}
      >
        <div
          className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center ${
            activeTab === name ? 'tw-bg-blue white-svg' : 'gray-svg'
          }`}
        >
          {icon}
        </div>
        <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
          {title}
        </label>
      </button>
    </Link>
  );
};
