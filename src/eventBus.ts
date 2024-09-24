type ListenerType<T> = (data: T) => void;

const EventBus = () => {
    const topics = new Map<string, ListenerType<any>[]>();

    const subscribe = (topic: string, listener: ListenerType<any>) => {
        if (!topics.has(topic)) {
            topics.set(topic, []);
        }
        topics.get(topic)?.push(listener);

        return () => {
            const listeners = topics.get(topic);
            if (listeners) listeners.splice(listeners.indexOf(listener), 1);
        };
    };

    const publish = <T>(topic: string, data: T) => {
        if (!topics.has(topic)) return;
        topics.get(topic)?.forEach((listener) => listener(data));
    };

    return { subscribe, publish };
};

const bus = EventBus();
export default bus;
