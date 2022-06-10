import { useContext } from 'react';
// mui
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
// - icons
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// context
import { ColorModeContext } from '../../../../providers/ColorModeProvider';

const ColorModeToggleButton: React.FC = () => {
  const { mode: colorMode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <Tooltip
      title={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {colorMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Tooltip>
  );
};
export default ColorModeToggleButton;
