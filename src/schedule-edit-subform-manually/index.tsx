import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import CrontabGenerator from "./crontab-generator";
import { usePopover } from "./hooks";
import { Icon } from "@iconify/react";
import CustomPopover from "./components/custom-popover";

export default function ScheduleSubEditManually() {
  const inputPopover = usePopover();
  const helpPopover = usePopover();

  return (
    <>
      <Box width={1} display={"flex"} alignItems={"center"} gap={1}>
        <TextField
          name="crontab"
          label="Crontab"
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={inputPopover.onOpen}>
                  <Icon icon="mdi:keyboard" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ flex: 3 }}
        />
        <Box sx={{ flex: 1 }}>
          <Tooltip arrow placement="top" title="Help">
            <IconButton onClick={helpPopover.onOpen}>
              <Icon icon="mdi:question-mark-circle-outline" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <CrontabGenerator inputPopover={inputPopover} />
      <CustomPopover
        open={helpPopover.open}
        onClose={helpPopover.onClose}
        arrow="top-right"
      >
        <Box component={"pre"} px={3}>
          <Box component={"code"}>{helpText}</Box>
        </Box>
      </CustomPopover>
    </>
  );
}

const helpText = `# ┌───────── 분 (0 - 59)
# │ ┌─────── 시 (0 - 23)
# │ │ ┌───── 일 (1 - 31)
# │ │ │ ┌─── 월 (1 - 12)
# │ │ │ │ ┌─ 요일 (0 - 6(7)) (0 - 6 은 일 - 토와 같음; 7은 일요일의 별칭)
# │ │ │ │ │
# * * * * *  실행 명령어 (예시: * * * * * 는 매 분 실행됨)`;
