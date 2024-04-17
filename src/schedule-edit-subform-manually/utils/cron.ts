import cronstrue from "cronstrue";
import "cronstrue/locales/ko";

export const validateCron = (cron: string) => {
  try {
    cronstrue.toString(cron);
    return true;
  } catch (error) {
    return false;
  }
};

export const humanizeCron = (cron: string, locale: string = "ko") => {
  try {
    return `${cronstrue.toString(cron, {
      locale,
    })} 실행합니다.`;
  } catch (error) {
    console.error(error);

    return "유효한 표현식을 입력해주세요. 예시: 0 0 * * *";
  }
};
