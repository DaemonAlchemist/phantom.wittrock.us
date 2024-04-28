import { createInjector, inject, mergeProps } from "unstateless";
import {NotificationButtonComponent} from "./NotificationButton.component";
import {INotificationButtonInputProps, NotificationButtonProps, INotificationButtonProps} from "./NotificationButton.d";

const injectNotificationButtonProps = createInjector(({}:INotificationButtonInputProps):INotificationButtonProps => {
    return {};
});

const connect = inject<INotificationButtonInputProps, NotificationButtonProps>(mergeProps(
    injectNotificationButtonProps,
));

export const NotificationButton = connect(NotificationButtonComponent);
