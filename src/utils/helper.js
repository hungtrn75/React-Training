import { notification } from "antd";

const openNotificationWithIcon = (type, downloadURL) => {
  switch (type) {
    case "success":
      notification[type]({
        message: "Upload successful",
        description: `File available at ${downloadURL}`
      });
      break;
    case "error":
      notification[type]({
        message: "Upload failed"
      });
      break;
    default:
  }
};

export { openNotificationWithIcon };
