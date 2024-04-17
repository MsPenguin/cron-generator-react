import React from "react";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import CronInputs from "./cron-inputs";
import { CronInputActionType, CronInputType } from "./types";
import { usePopover } from "./hooks";
import { humanizeCron } from "./utils/cron";
import CustomPopover from "./components/custom-popover";

const initCrontabState: CronInputType = {
  minute: [],
  hour: [],
  dayOfMonth: [],
  month: [],
  dayOfWeek: [],
};

const crontabReducer = (state: CronInputType, action: CronInputActionType) => {
  if (!(action.type === "reset" || action.type === "remove"))
    if (action.payload === "" || state[action.type].includes(action.payload))
      return state;
    else if (action.payload === "*") return { ...state, [action.type]: [] };

  switch (action.type) {
    case "minute":
      return { ...state, minute: [...state.minute, action.payload] };
    case "hour":
      return { ...state, hour: [...state.hour, action.payload] };
    case "dayOfMonth":
      return { ...state, dayOfMonth: [...state.dayOfMonth, action.payload] };
    case "month":
      return { ...state, month: [...state.month, action.payload] };
    case "dayOfWeek":
      return {
        ...state,
        dayOfWeek: action.payload === "0-6" ? [] : action.payload.split(","),
      };
    case "remove": {
      const length = state[action.payload].length;

      if (length === 0) return state;
      else
        return {
          ...state,
          [action.payload]: [...state[action.payload].slice(0, length - 1)],
        };
    }
    case "reset":
      return { ...initCrontabState };
    default:
      console.error("Invalid action type");
      return state;
  }
};

export default function CrontabGenerator({
  inputPopover,
}: {
  inputPopover: ReturnType<typeof usePopover>;
}) {
  const [currentField, setCurrentField] =
    React.useState<keyof CronInputType>("minute");

  const [crontab, dispatchCrontab] = React.useReducer(
    crontabReducer,
    initCrontabState
  );

  const result = React.useMemo(
    () =>
      Object.values(crontab).reduce((acc, value) => {
        if (value.length === 0) return acc ? `${acc} *` : "*";

        return `${acc ? `${acc} ` : ""}${value.join()}`;
      }, ""),
    [crontab]
  );

  const textFieldCommonProps: TextFieldProps = React.useMemo(() => {
    const onCrontabChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatchCrontab({
        type: e.target.name as keyof CronInputType,
        payload: e.target.value,
      });

    const onFieldFocus = (event: React.FocusEvent<HTMLInputElement>) =>
      setCurrentField(event.target.name as keyof CronInputType);

    return {
      onChange: onCrontabChange,
      InputProps: {
        readOnly: true,
      },
      onFocus: onFieldFocus,
      variant: "filled",
    };
  }, []);

  const onGeneratorClose = () => {
    setTimeout(() => {
      setCurrentField("minute");
      dispatchCrontab({ type: "reset" });
    }, 300);

    inputPopover.onClose();
  };

  return (
    <CustomPopover
      open={inputPopover.open}
      arrow="top-right"
      sx={{ width: "720px" }}
    >
      <CardHeader
        title="Crontab 생성기"
        action={
          <IconButton size="small" onClick={onGeneratorClose}>
            <Icon icon="mdi:close" />
          </IconButton>
        }
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box
          p={2}
          border={"1px solid"}
          borderColor={"divider"}
          borderRadius={1}
        >
          <Stack direction={"row"} spacing={1}>
            <TextField
              {...textFieldCommonProps}
              label="분"
              name="minute"
              value={crontab.minute.join(", ") || "*"}
              focused={currentField === "minute"}
            />
            <TextField
              {...textFieldCommonProps}
              label="시"
              name="hour"
              value={crontab.hour.join(", ") || "*"}
              focused={currentField === "hour"}
            />
            <TextField
              {...textFieldCommonProps}
              label="일"
              name="dayOfMonth"
              value={crontab.dayOfMonth.join(", ") || "*"}
              focused={currentField === "dayOfMonth"}
            />
            <TextField
              {...textFieldCommonProps}
              label="월"
              name="month"
              value={crontab.month.join(", ") || "*"}
              focused={currentField === "month"}
            />
            <TextField
              {...textFieldCommonProps}
              label="요일"
              name="dayOfWeek"
              value={crontab.dayOfWeek.join(", ") || "*"}
              focused={currentField === "dayOfWeek"}
            />
          </Stack>
          {result && (
            <Box display={"flex"} gap={1}>
              <Typography variant="body2" color="text.secondary" mt={2}>
                예상 결과:
              </Typography>
              <Typography variant="body2" color="text.primary" mt={2}>
                {humanizeCron(result)}
              </Typography>
            </Box>
          )}
        </Box>
        <Stack
          spacing={2}
          border={"1px solid"}
          borderColor={"divider"}
          borderRadius={1}
          p={3}
          minHeight={324}
        >
          <CronInputs
            currentField={currentField}
            dispatchCrontab={dispatchCrontab}
          />
        </Stack>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="warning"
            onClick={onGeneratorClose}
          >
            취소
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              onGeneratorClose();
            }}
          >
            확인
          </Button>
        </CardActions>
      </CardContent>
    </CustomPopover>
  );
}
