import { PropsWithChildren, createContext, useState, useMemo } from 'react';

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

const ColorModeProvider: React.FC<PropsWithChildren<unknown>> = ({
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
