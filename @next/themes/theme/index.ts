// project import
import Default from './default';

// types
import { PaletteThemeProps } from '@types';
import { PalettesProps } from '@ant-design/colors';
import { PresetColor } from '@types';

// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

const Theme = (
  colors: PalettesProps,
  presetColor: PresetColor,
): PaletteThemeProps => {
  switch (presetColor) {
    default:
      return Default(colors);
  }
};

export default Theme;
