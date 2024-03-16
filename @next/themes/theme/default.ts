// types
import { PaletteThemeProps } from '@types';
import { PalettesProps } from '@ant-design/colors';
import { PaletteColorOptions } from '@mui/material/styles';

// ==============================|| PRESET THEME - DEFAULT ||============================== //

const Default = (colors: PalettesProps): PaletteThemeProps => {
  const { blue, red, gold, cyan, green, grey } = colors;
  const greyColors: PaletteColorOptions = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16],
  };
  const contrastText = '#fff';

  return {
    primary: {
      main: '#645CAA',
      light: `#6E7191`,
      dark: '#2E285C',
      contrastText,
    },
    secondary: {
      lighter: `#A0A3BD`,
      100: greyColors[100],
      200: greyColors[200],
      light: greyColors[300],
      400: greyColors[400],
      main: greyColors[500]!,
      600: greyColors[600],
      dark: greyColors[700],
      800: greyColors[800],
      darker: greyColors[900],
      A100: greyColors[0],
      A200: greyColors.A400,
      A300: greyColors.A700,
      contrastText: greyColors[0],
    },
    error: {
      main: '#FF4C35',
      contrastText,
    },
    warning: {
      lighter: gold[0],
      light: gold[3],
      main: '#FAA31E',
      dark: gold[7],
      darker: gold[9],
      contrastText: greyColors[100],
    },
    info: {
      lighter: cyan[0],
      light: cyan[3],
      main: cyan[5],
      dark: cyan[7],
      darker: cyan[9],
      contrastText,
    },
    success: {
      lighter: '#ceeedc',
      main: '#0BAB52',
      contrastText,
    },
    grey: greyColors,
  };
};

export default Default;
