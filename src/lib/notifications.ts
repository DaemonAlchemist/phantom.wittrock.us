import { useSharedState } from "unstateless";

export const useNotificationPermission = useSharedState<boolean>("canNotify", Notification.permission);

export const notify = (body:string) => {
    const icon = "/PotA-icon.webp";
    new Notification("Phantom of the Author-a", {body, icon});
}