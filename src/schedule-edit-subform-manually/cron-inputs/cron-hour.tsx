import {
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import React from "react";
import { CronInputActionType, CronInputType } from "../types";
import CronFooter from "./cron-footer";

const defaultValues: {
  type: "specific" | "range" | "wildcard";
  fireTime: {
    from: string;
    to: string;
  };
  isRepetitive: boolean;
  interval: string;
} = {
  type: "wildcard",
  fireTime: {
    from: "",
    to: "",
  },
  isRepetitive: false,
  interval: "",
};

const valuesReducer = (
  state: typeof defaultValues,
  action:
    | {
        type: "type";
        payload: "specific" | "range" | "wildcard";
      }
    | {
        type: "from" | "to" | "interval";
        payload: string;
      }
    | {
        type: "isRepetitive";
        payload: boolean;
      }
    | { type: "reset" }
) => {
  switch (action.type) {
    case "type":
      if (action.payload === "range")
        return {
          ...defaultValues,
          type: action.payload,
        };
      else
        return {
          ...state,
          type: action.payload,
          fireTime: { ...defaultValues.fireTime },
        };
    case "from":
      return {
        ...state,
        fireTime: { ...state.fireTime, from: action.payload },
      };
    case "to":
      return {
        ...state,
        fireTime: { ...state.fireTime, to: action.payload },
      };
    case "isRepetitive":
      return { ...state, isRepetitive: action.payload, interval: "" };
    case "interval":
      return { ...state, interval: action.payload };
    default:
      console.error("Invalid action type");
      return state;
  }
};

const CronHour = (props: {
  currentField: keyof CronInputType;
  dispatchCrontab: React.Dispatch<CronInputActionType>;
}) => {
  const [values, dispatchValues] = React.useReducer(
    valuesReducer,
    defaultValues
  );

  const result = `${
    values.type === "wildcard"
      ? "*"
      : `${values.fireTime.from || "0"}${
          values.type === "range" && values.fireTime.to
            ? `-${values.fireTime.to}`
            : ""
        }`
  }${values.isRepetitive && values.interval ? `/${values.interval}` : ""}`;

  const handleValuesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "isRepetitive")
      dispatchValues({
        type: event.target.name,
        payload: event.target.checked,
      });
    else {
      if (
        event.target.name === "type" &&
        (event.target.value === "wildcard" ||
          event.target.value === "specific" ||
          event.target.value === "range")
      )
        dispatchValues({
          type: event.target.name,
          payload: event.target.value,
        });
      else {
        if (event.target.value.match(/^[0-9]*$/))
          if (event.target.value.length > 1 && event.target.value[0] === "0")
            dispatchValues({
              type: event.target.name as "from" | "to" | "interval",
              payload: event.target.value[1],
            });
          else
            dispatchValues({
              type: event.target.name as "from" | "to" | "interval",
              payload: +event.target.value > 23 ? "23" : event.target.value,
            });
      }
    }
  };

  const numberfieldProps: TextFieldProps = {
    autoComplete: "off",
    inputProps: { inputMode: "numeric" },
    size: "small",
    sx: { width: "56px" },
    onChange: handleValuesChange,
    label: "시",
  };

  const helperText = (
    <Typography variant="caption" color={"text.secondary"} lineHeight={"40px"}>
      (0-23)
    </Typography>
  );

  return (
    <>
      <Stack spacing={2} mb={"auto"}>
        <>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Typography
              variant="subtitle2"
              width={"20%"}
              textAlign={"right"}
              lineHeight={"40px"}
            >
              분류
            </Typography>
            <RadioGroup
              row
              aria-labelledby="type-radio-buttons-group-label"
              name="type"
              sx={{ ml: 1 }}
              value={values.type}
              onChange={handleValuesChange}
            >
              <FormControlLabel
                value="wildcard"
                control={<Radio />}
                label="와일드카드"
              />
              <FormControlLabel
                value="specific"
                control={<Radio />}
                label="지정"
              />
              <FormControlLabel
                value="range"
                control={<Radio />}
                label="기간"
              />
            </RadioGroup>
          </Stack>
          {values.type !== "wildcard" && (
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              {values.type === "specific" && (
                <>
                  <Typography
                    variant="body2"
                    width={"20%"}
                    lineHeight={"40px"}
                    textAlign={"right"}
                    color={"text.secondary"}
                  >
                    실행시간
                  </Typography>
                  <TextField
                    {...numberfieldProps}
                    name="from"
                    value={values.fireTime.from}
                  />
                </>
              )}
              {values.type === "range" && (
                <>
                  <Typography
                    variant="body2"
                    width={"20%"}
                    lineHeight={"40px"}
                    textAlign={"right"}
                    color={"text.secondary"}
                  >
                    시작시간
                  </Typography>
                  <TextField
                    {...numberfieldProps}
                    name="from"
                    value={values.fireTime.from}
                  />
                  -
                  <Typography
                    variant="body2"
                    color={"text.secondary"}
                    lineHeight={"40px"}
                  >
                    종료시간
                  </Typography>
                  <TextField
                    {...numberfieldProps}
                    name="to"
                    value={values.fireTime.to}
                  />
                </>
              )}
              {helperText}
            </Stack>
          )}
        </>
        {values.type !== "range" && (
          <>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Typography
                variant="subtitle2"
                width={"20%"}
                textAlign={"right"}
                lineHeight={"40px"}
              >
                반복 설정
              </Typography>
              <Switch
                value={values.isRepetitive}
                name="isRepetitive"
                onChange={handleValuesChange}
              />
            </Stack>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Typography
                variant="body2"
                width={"20%"}
                lineHeight={"40px"}
                textAlign={"right"}
                color={"text.secondary"}
              >
                간격
              </Typography>
              {values.isRepetitive ? (
                <>
                  <TextField
                    {...numberfieldProps}
                    name="interval"
                    value={values.interval}
                  />
                  {helperText}
                </>
              ) : (
                <Typography
                  variant="body2"
                  color={"text.secondary"}
                  lineHeight={"40px"}
                >
                  설정 안 함
                </Typography>
              )}
            </Stack>
          </>
        )}
      </Stack>
      <Divider />
      <CronFooter {...props} result={result} />
    </>
  );
};

export default CronHour;
