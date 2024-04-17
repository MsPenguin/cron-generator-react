import {
  Button,
  Checkbox,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { CronInputActionType, CronInputType } from "../types";

const defaultValues = new Array(7).fill(false);

const valuesReducer = (
  state: typeof defaultValues,
  action: { index: number; payload: boolean }
) => {
  if (action.index === -1) return new Array(7).fill(action.payload);
  else
    return [
      ...state.slice(0, action.index),
      action.payload,
      ...state.slice(action.index + 1),
    ];
};

const CronDayOfWeek = (props: {
  currentField: keyof CronInputType;
  dispatchCrontab: React.Dispatch<CronInputActionType>;
}) => {
  const { currentField, dispatchCrontab } = props;

  const [values, dispatchValues] = React.useReducer(
    valuesReducer,
    defaultValues
  );

  const result = React.useMemo(() => {
    const parts: number[][] = [];

    values.forEach((value, index) => {
      if (!value) return; // 값의 유무를 확인합니다.

      if (
        parts.length === 0 ||
        parts[parts.length - 1][parts[parts.length - 1].length - 1] !==
          index - 1
      )
        parts.push([]); // part가 없는 경우와 part의 마지막 값이 새로운 값의 successor가 아닌 경우, 새로운 part를 추가합니다.

      parts[parts.length - 1].push(index);
    });

    const _result = parts.reduce((acc, crr, i) => {
      if (crr.length === 0) return acc;
      else
        return `${acc ? acc : ""}${
          crr.length === 1 ? crr[0] : `${crr[0]}-${crr[crr.length - 1]}`
        }${i === parts.length - 1 ? "" : ","}`;
    }, "");

    return _result === "0-6" ? "*" : _result || "*";
  }, [values]);

  return (
    <>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Typography
          variant="subtitle2"
          width={"20%"}
          textAlign={"right"}
          lineHeight={"40px"}
          mr={1}
        >
          선택 요일
        </Typography>
        {values.map((value, index) => (
          <Chip
            key={mappedDoW[index]}
            variant={values[index] ? "filled" : "soft"}
            label={mappedDoW[index]}
            color={values[index] ? "primary" : "default"}
            onClick={() => dispatchValues({ index, payload: !value })}
            sx={{ py: 2.314 }}
          />
        ))}
      </Stack>
      <Stack direction={"row"} spacing={2} mb={"auto"} alignItems={"center"}>
        <Typography
          variant="body2"
          width={"20%"}
          lineHeight={"40px"}
          textAlign={"right"}
          color={"text.secondary"}
        >
          전체 선택
        </Typography>
        <Checkbox
          size="large"
          checked={values.every((value) => value)}
          onChange={(e) =>
            dispatchValues({ index: -1, payload: e.target.checked })
          }
        />
      </Stack>
      <Divider />
      <Stack direction={"row"} spacing={1} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          size="small"
          onClick={() =>
            dispatchCrontab({ type: currentField, payload: result })
          }
        >
          적용
        </Button>
      </Stack>
    </>
  );
};

const mappedDoW = ["일", "월", "화", "수", "목", "금", "토", "일"] as const;

export default CronDayOfWeek;
