import { Theme } from "@mui/material/styles";
import { tabClasses } from "@mui/material/Tab";

// ----------------------------------------------------------------------

export default function Tabs(theme: Theme) {
  return {
    MuiTabs: {
      defaultProps: {
        textColor: "inherit",
        variant: "scrollable",
        allowScrollButtonsMobile: true,
      },
      styleOverrides: {
        indicator: {
          display: "none",
          backgroundColor: theme.palette.text.primary,
        },
        scrollButtons: {
          width: 48,
          borderRadius: "50%",
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
        iconPosition: "start",
      },
      styleOverrides: {
        root: {
          padding: 0,
          opacity: 1,
          minWidth: 'max-content',
          minHeight: 48,
          fontWeight: theme.typography.fontWeightSemiBold,
          "&:not(:last-of-type)": {
            marginRight: theme.spacing(1),
            [theme.breakpoints.up("md")]: {
              marginRight: theme.spacing(2),
            },
          },
          [`&:not(.${tabClasses.selected})`]: {
            color: theme.palette.text.secondary,
          },
        },
      },
    },
  };
}
