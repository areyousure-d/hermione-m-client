import { notifications } from "@mantine/notifications";

import { Icon } from "../ui/icon";

type NotificationParams = {
  id: string;
  message: string;
};

export const showLoadingNotification = ({
  id,
  message,
}: NotificationParams) => {
  notifications.show({
    id,
    title: "Loading",
    message,
    loading: true,
  });
};

export const showSuccessNotification = ({
  id,
  message,
}: NotificationParams) => {
  notifications.update({
    id,
    title: "Success",
    message,
    color: "green",
    icon: <Icon type="common" name="check" />,
    loading: false,
  });
};

export const showErrorNotification = ({ id, message }: NotificationParams) => {
  notifications.update({
    id,
    title: "Error",
    message,
    color: "red",
    icon: <Icon type="common" name="x" />,
    loading: false,
  });
};
