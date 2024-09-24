import EventBus from "./eventBus";

export const showToast = (message: string): void => {
    EventBus.publish("SHOW_TOAST", { message });
};
