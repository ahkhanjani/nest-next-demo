import { useContext } from 'react';
import { useRouter } from 'next/router';

import { TabName } from 'fm/main-web-feature-student-dashboard';

import {
  BellIcon,
  CogIcon,
  InfoCircleIcon,
  MailIcon,
  MoonIcon,
  SunIcon,
} from '../assets/icons';

import { ColorModeContext } from 'fm/main-web-ui';

export const Header: React.FC = () => {
  const router = useRouter();
  const activeDesk = router.query['desk'] as TabName;

  const colorMode = useContext(ColorModeContext);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <div className="tw-bg-white tw-min-w-full  tw-py-6 tw-flex tw-flex-row tw-items-center tw-justify-around tw-shadow-md 2xl:tw-justify-between 2xl:tw-pr-9">
      <span className="tw-text-2xl tw-text-lightGray tw-font-normal tw-px-6 tw-border-r-4 tw-border-r-field 2xl:tw-border-none 2xl:tw-hidden">
        {activeDesk}
      </span>
      <div className="tw-px-9  ">
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
      <div className="tw-flex tw-flex-row tw-items-center ">
        <div
          className={`tw-border-field tw-border-2 tw-rounded-xl tw-mr-6 tw-w-11 tw-h-6 tw-px-1  tw-transition-all tw-duration-300 tw-flex tw-flex-row tw-items-center tw-justify-between tw-relative ${
            colorMode.mode === 'dark' ? 'tw-bg-gray' : 'tw-bg-white'
          }`}
        >
          <span className="tw-p-1 tw-flex tw-items-center tw-justify-center">
            <SunIcon />
          </span>
          <span className="tw-p-1 tw-flex tw-items-center tw-justify-center">
            <MoonIcon />
          </span>
          <div
            className={`tw-h-[17px] tw-w-[17px] tw-absolute tw-rounded-full tw-cursor-pointer tw-transition-all tw-duration-300 ${
              colorMode.mode ? 'tw-translate-x-4 tw-bg-white' : 'tw-bg-gray'
            }`}
            onClick={() => colorMode.toggleColorMode()}
          ></div>
        </div>
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
