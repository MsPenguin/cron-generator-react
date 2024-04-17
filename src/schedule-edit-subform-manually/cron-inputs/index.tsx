import { CronInputActionType, CronInputType } from "../types";
import CronMinute from "./cron-minute";
import React from "react";
import CronHour from "./cron-hour";
import CronDayOfMonth from "./cron-day-of-month";
import CronMonth from "./cron-month";
import CronDayOfWeek from "./cron-day-of-week";

type CronInputsProps = {
  currentField: keyof CronInputType;
  dispatchCrontab: React.Dispatch<CronInputActionType>;
};

const CronInputs = (props: CronInputsProps) => {
  const { currentField } = props;

  switch (currentField) {
    case "minute":
      return <CronMinute {...props} />;
    case "hour":
      return <CronHour {...props} />;
    case "dayOfMonth":
      return <CronDayOfMonth {...props} />;
    case "month":
      return <CronMonth {...props} />;
    case "dayOfWeek":
      return <CronDayOfWeek {...props} />;
    default:
      return null;
  }
};

export default CronInputs;
