import { useRouter } from 'next/router';

import { TabName } from 'fm/main-web-feature-student-dashboard';

import { DarkModeSwitch } from 'fm/main-web-feature-darkmode-switch';
import {
  BellIcon,
  CogIcon,
  InfoCircleIcon,
  MailIcon,
} from 'fm/shared-assets/icons';

export const Header: React.FC = () => {
  const router = useRouter();
  const activeDesk = router.query['desk'] as TabName;

  return (
    <div className="tw-bg-white tw-min-w-full  tw-py-6 tw-flex tw-flex-row tw-items-center tw-justify-around tw-shadow-md 2xl:tw-justify-between 2xl:tw-pr-9">
      <span className="tw-text-2xl tw-text-lightGray tw-font-normal tw-px-6 tw-border-r-4 tw-border-r-field 2xl:tw-border-none 2xl:tw-hidden">
        {activeDesk}
      </span>
      <div className="tw-px-9">
        <div
          tabIndex={0}
          className="tw-daisy-collapse tw-daisy-collapse-arrow tw-shadow-md tw-bg-white tw-rounded-box"
        >
          <input type="checkbox" />
          <div className="tw-daisy-collapse-title tw-flex tw-flex-row tw-items-center">
            <InfoCircleIcon />
            <span className="tw-text-sm tw-font-medium tw-pl-2">
              Daily idiom:
            </span>
            <span className="tw-text-sm tw-font-normal">
              {"Sweep (someone) off (someone's) feet"}
            </span>
          </div>
          <div className="tw-daisy-collapse-content">
            <p className="tw-text-sm tw-font-normal tw-text-grayText">
              A feeling when you fall in love instantly with someone.
              <br />A feeling when you fall in love instantly with someone.
            </p>
          </div>
        </div>
      </div>
      <div className="tw-flex tw-flex-row tw-items-center">
        <DarkModeSwitch />
        <button>
          <CogIcon />
        </button>
        <button className="tw-px-9 ">
          <BellIcon />
        </button>
        <button>
          <MailIcon />
        </button>
      </div>
    </div>
  );
};
export default Header;
