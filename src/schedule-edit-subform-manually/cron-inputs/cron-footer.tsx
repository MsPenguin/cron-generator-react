import { Button, Stack } from "@mui/material";
import { CronInputActionType, CronInputType } from "../types";

type CronFooterProps = {
  currentField: keyof CronInputType;
  dispatchCrontab: React.Dispatch<CronInputActionType>;
  result: any;
};

const CronFooter = (props: CronFooterProps) => {
  const { currentField, dispatchCrontab, result } = props;

  return (
    <Stack direction={"row"} spacing={1} justifyContent={"space-between"}>
      <Button
        variant="outlined"
        size="small"
        onClick={() =>
          dispatchCrontab({ type: "remove", payload: currentField })
        }
      >
        지우기
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={() => dispatchCrontab({ type: currentField, payload: result })}
      >
        추가
      </Button>
    </Stack>
  );
};

export default CronFooter;
