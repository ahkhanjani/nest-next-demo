import { useContext } from 'react';

import { ColorModeContext } from 'fm/main-web-ui';
import { MoonIcon, SunIcon } from 'fm/shared-assets/icons';

export const DarkModeSwitch: React.FC = () => {
  const darkMode = useContext(ColorModeContext);

  return (
    <div className="tw-daisy-form-control">
      <label className="tw-daisy-label tw-cursor-pointer">
        <span className="tw-p-1 tw-flex tw-items-center tw-justify-center">
          {darkMode.isDarkMode ? <SunIcon /> : <MoonIcon />}
        </span>
        <input
          type="checkbox"
          className="tw-daisy-toggle"
          checked={!darkMode.isDarkMode}
          onChange={() => {
            darkMode.toggleDarkMode();
          }}
        />
      </label>
    </div>
  );
};
export default DarkModeSwitch;

// <div
//   className={`tw-border-field tw-border-2 tw-rounded-xl tw-mr-6 tw-w-11 tw-h-6 tw-px-1  tw-transition-all tw-duration-300 tw-flex tw-flex-row tw-items-center tw-justify-between tw-relative ${
//     colorMode.mode === 'dark' ? 'tw-bg-gray' : 'tw-bg-white'
//   }`}
// >

//   <div
//     className={`tw-h-[17px] tw-w-[17px] tw-absolute tw-rounded-full tw-cursor-pointer tw-transition-all tw-duration-300 ${
//       colorMode.mode ? 'tw-translate-x-4 tw-bg-white' : 'tw-bg-gray'
//     }`}
//     onClick={() => colorMode.toggleColorMode()}
//   ></div>
// </div>;
