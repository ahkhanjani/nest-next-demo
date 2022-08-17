import { useEffect } from 'react';
import { themeChange } from 'theme-change';

import { MoonIcon, SunIcon } from 'fm/shared-assets/icons';
import useDarkMode from './useDarkMode';

export const DarkModeSwitch: React.FC = () => {
  const [colorTheme, setTheme] = useDarkMode();

  useEffect(() => {
    // initialize theme-change: https://github.com/saadeghi/theme-change
    themeChange(false);
  }, []);

  return (
    <div
      className="tw-daisy-form-control"
      title={`Switch to ${colorTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <label className="tw-daisy-label tw-cursor-pointer">
        <span className="tw-p-1 tw-flex tw-items-center tw-justify-center">
          {colorTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </span>
        <input
          data-toggle-theme="dark,light"
          type="checkbox"
          className="tw-daisy-toggle"
          checked={colorTheme === 'dark'}
          onChange={() => {
            setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
          }}
        />
      </label>
    </div>
  );
};
export default DarkModeSwitch;
