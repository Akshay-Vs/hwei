'use client';
import { toast } from 'sonner';

interface IToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

const toastMapping = {
  success: toast.success,
  error: toast.error,
  info: toast.info,
  warning: toast.warning,
};

export const Toast = ({ type, message }: IToastProps) => {
  const toastFunction = toastMapping[type];
  if (toastFunction) {
    toastFunction(message);
  }
};