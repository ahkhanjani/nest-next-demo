import { PropsWithChildren, useContext, useMemo } from 'react';
// mui
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// providers
import { ColorModeContext, ColorModeContextType } from './ColorModeProvider';

const ThemeProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const colorMode: ColorModeContextType = useContext(ColorModeContext);

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: colorMode.mode },
      }),
    [colorMode.mode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
export default ThemeProvider;
