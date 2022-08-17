import { useEffect, useState } from 'react';

function useDarkMode(): [
  ColorTheme,
  React.Dispatch<React.SetStateAction<ColorTheme>>,
] {
  const [theme, setTheme] = useState<ColorTheme>(
    typeof window !== 'undefined' ? localStorage['theme'] : 'dark',
  );

  useEffect(() => {
    if (
      theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
export default useDarkMode;

type ColorTheme = 'light' | 'dark';
