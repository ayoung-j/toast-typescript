import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import bus from "../eventBus";

// 타입 정의
interface ToastType {
    id: number;
    message: string;
}

const Toast = () => {
    // useState의 초기값 타입 설정/ 제네릭타입, 객체들의 배열로 정의
    const [toasts, setToasts] = useState<ToastType[]>([]);

    useEffect(() => {
        const handleToastEvent = (toast: { message: string }) => {
            // 토스트를 받으면 이전 토스트에 받은 토스트 추가
            setToasts((prevToasts) => [...prevToasts, { id: Date.now(), ...toast }]);

            setTimeout(() => {
                // 1.5초 후에 하나씩 토스트 지움
                setToasts((prevToasts) => prevToasts.slice(1));
            }, 1500);
        };

        const unsubscribe = bus.subscribe("SHOW_TOAST", handleToastEvent);

        return () => unsubscribe();
    }, []);

    return createPortal(
        <div className="toast-container">
            {toasts.map((toast, index) => (
                <div key={index} className="toast bg-teal-500 text-white">
                    {toast.message}
                </div>
            ))}
        </div>,
        document.body // body에 추가
    );
};

export default Toast;
