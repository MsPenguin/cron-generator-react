export type CronInputType = {
  minute: string[];
  hour: string[];
  dayOfMonth: string[];
  month: string[];
  dayOfWeek: string[];
};

export type CronInputActionType =
  | {
      type: keyof CronInputType;
      payload: string;
    }
  | {
      type: "remove";
      payload: keyof CronInputType;
    }
  | {
      type: "reset";
    };
