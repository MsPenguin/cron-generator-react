import { Theme } from "@mui/material/styles";
import { buttonClasses } from "@mui/material/Button";
import { Icon } from "@iconify/react";
// components

// ----------------------------------------------------------------------

const dateList = [
  "DatePicker",
  "DateTimePicker",
  "StaticDatePicker",
  "DesktopDatePicker",
  "DesktopDateTimePicker",
  //
  "MobileDatePicker",
  "MobileDateTimePicker",
];

const timeList = [
  "TimePicker",
  "MobileTimePicker",
  "StaticTimePicker",
  "DesktopTimePicker",
];

const switchIcon = () => <Icon icon="mdi:chevron-down" width={24} />;

const leftIcon = () => <Icon icon="mdi:chevron-left" width={24} />;

const rightIcon = () => <Icon icon="mdi:chevron-right" width={24} />;

const calendarIcon = () => (
  <Icon icon="solar:calendar-mark-bold-duotone" width={24} />
);

const clockIcon = () => <Icon icon="solar:clock-circle-outline" width={24} />;

const desktopTypes = dateList.reduce(
  (result: Record<string, any>, currentValue) => {
    result[`Mui${currentValue}`] = {
      defaultProps: {
        slots: {
          openPickerIcon: calendarIcon,
          leftArrowIcon: leftIcon,
          rightArrowIcon: rightIcon,
          switchViewIcon: switchIcon,
        },
      },
    };

    return result;
  },
  {}
);

const timeTypes = timeList.reduce(
  (result: Record<string, any>, currentValue) => {
    result[`Mui${currentValue}`] = {
      defaultProps: {
        slots: {
          openPickerIcon: clockIcon,
          rightArrowIcon: rightIcon,
          switchViewIcon: switchIcon,
        },
      },
    };

    return result;
  },
  {}
);

export default function DatePicker(theme: Theme) {
  return {
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          "& .MuiPickersLayout-actionBar": {
            [`& .${buttonClasses.root}:last-of-type`]: {
              backgroundColor: theme.palette.text.primary,
              color:
                theme.palette.mode === "light"
                  ? theme.palette.common.white
                  : theme.palette.grey[800],
            },
          },
        },
      },
    },

    // Date
    ...desktopTypes,

    // Time
    ...timeTypes,
  };
}
