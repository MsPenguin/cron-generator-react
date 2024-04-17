import { palette } from '../palette';
import { customShadows } from '../custom-shadows';

// ----------------------------------------------------------------------

export function contrast(contrastBold: boolean, mode: 'light' | 'dark') {
  const theme = {
    ...(contrastBold &&
      mode === 'light' && {
        palette: {
          background: {
            default: palette(mode).grey[200],
          },
        },
      }),
  };

  const components = {
    ...(contrastBold && {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: customShadows(mode).z8,
          },
        },
      },
    }),
  };

  return {
    theme,
    components,
  };
}
