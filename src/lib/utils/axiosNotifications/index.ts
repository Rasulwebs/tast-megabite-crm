import { AxiosError } from "axios";
import { notification } from "antd";

export const makeErrMsg = (error: AxiosError<any>): string => {
  if (!error.response?.data) {
    return error.message;
  }

  const message = error.response.data;

  if (!message) {
    return error.message;
  }

  return message;
};

export const addNotificationAxios = (data: AxiosError<any> | string): void => {
  if (data instanceof AxiosError) {
    notification.error({
      message: makeErrMsg(data),
      placement: "topRight",
    });

    return;
  }

  notification.success({
    message: data,
    placement: "topRight",
  });
};

export const addNotificationFirebaseErr = (data: string): void => {
  if (data) {
    notification.error({
      message: data,
      placement: "topRight",
    });

    return;
  }
};
