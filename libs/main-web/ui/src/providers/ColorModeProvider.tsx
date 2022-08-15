import {
  PropsWithChildren,
  createContext,
  useState,
  useMemo,
  useEffect,
} from 'react';

/** The constant string name for saving color mode in local storage. */
const STORAGE_NAME = 'darkmode';

export const ColorModeContext = createContext<DarkModeContextType>(
  {} as DarkModeContextType,
);

export const DarkModeProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const darkMode = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode: () => {
        setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
      },
    }),
    [isDarkMode],
  );

  // get the color mode from the local storage cookie.
  useEffect(() => {
    const userDarkMode: string | null = localStorage.getItem(STORAGE_NAME);

    if (
      // if cookie doesn't exist...
      !userDarkMode ||
      // or if the saved value doesn't match with the definition...
      (userDarkMode !== 'true' && userDarkMode !== 'false')
    ) {
      localStorage.setItem(STORAGE_NAME, 'false');
      setIsDarkMode(false);
      return;
    }

    setIsDarkMode(userDarkMode === 'true');
  }, []);

  // saves color mode in the local storage cookie.
  useEffect(() => {
    localStorage.setItem(STORAGE_NAME, isDarkMode ? 'true' : 'false');
  }, [isDarkMode]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <ColorModeContext.Provider value={darkMode}>
      {children}
    </ColorModeContext.Provider>
  );
};
export default DarkModeProvider;

export interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
