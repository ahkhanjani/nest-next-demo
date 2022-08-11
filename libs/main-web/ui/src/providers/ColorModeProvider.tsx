import {
  PropsWithChildren,
  createContext,
  useState,
  useMemo,
  useEffect,
} from 'react';

/** The constant string name for saving color mode in local storage. */
const STORAGE_NAME = 'theme';

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

export const ColorModeProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [mode, setMode] = useState<ColorMode>('light');

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode]
  );

  // get the color mode from the local storage cookie.
  useEffect(() => {
    function getInitialMode() {
      const userMode: string | null = localStorage.getItem(STORAGE_NAME);

      if (
        // if cookie doesn't exist...
        !userMode ||
        // or if the saved value doesn't match with the definition...
        (userMode !== 'light' && userMode !== 'dark')
      ) {
        // force-set the value
        const initialMode: ColorMode = 'light';
        localStorage.setItem(STORAGE_NAME, initialMode);
        setMode(initialMode);
        return;
      }

      setMode(userMode);
    }

    getInitialMode();
  }, []);

  // saves color mode in the local storage cookie.
  useEffect(() => {
    localStorage.setItem(STORAGE_NAME, mode);
  }, [mode]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
  );
};
export default ColorModeProvider;

type ColorMode = 'light' | 'dark';

export interface ColorModeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
}
