// utils/notify.ts
import { toast } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warn";

// Toast turini obyekt sifatida saqlash
const toastTypes = {
  success: toast.success,
  error: toast.error,
  info: toast.info,
  warn: toast.warn,
};

// Dinamik notify funksiyasi
export const notify = (type: ToastType, message: string): void => {
  const notify = toastTypes[type]; 

  if (notify) {
    notify(message); 
  }
};
