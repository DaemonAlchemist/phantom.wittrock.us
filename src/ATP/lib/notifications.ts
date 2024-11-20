import { useSharedState } from "unstateless";
import { notificationConfig } from "@config/notifications";

const {icon, appName} = notificationConfig;

export const useNotificationPermission = useSharedState<boolean>("canNotify", Notification.permission);

export const notify = (body:string) => {
    new Notification(appName, {body, icon});
}