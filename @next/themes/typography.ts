// material-ui
import { Theme, TypographyVariantsOptions } from '@mui/material/styles';

// types
import { FontFamily, ThemeMode } from '@types';

// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

const Typography = (
  mode: ThemeMode,
  fontFamily: FontFamily,
  theme: Theme,
): TypographyVariantsOptions => ({
  htmlFontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  fontFamily: 'Poppins',

  h1: {
    fontWeight: 500,
    fontSize: '2.25rem', // 36px
  },
  h2: {
    fontWeight: 500,
    fontSize: '1.75rem', // 28px
  },
  h3: {
    fontWeight: 500,
    fontSize: '1.375rem', // 22px
  },
  h4: {
    fontWeight: 400,
    fontSize: '1rem', // 16px
  },
  h5: {
    fontWeight: 500,
    fontSize: '1rem', // 16px
  },
  h6: {
    fontWeight: 400,
    fontSize: '0.875rem', // 14px
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: '0.813rem', // 13px
  },
  ///////////////////////////////
  subtitle2: {
    fontWeight: 400,
    fontSize: '0.938rem', // 14px
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.813rem', // 13px
  },
  button: {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.875rem', // 14px
  },
  body1: {
    fontSize: '0.875rem',
    lineHeight: 1.57,
  },
  body2: {
    fontSize: '0.75rem', // 12px
    lineHeight: 1.66,
  },
  overline: {
    lineHeight: 1.66,
  },
});

export default Typography;
