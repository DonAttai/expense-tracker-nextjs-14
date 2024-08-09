"use client";

import toast from "react-hot-toast";

export function toastErrorMessage(message: string) {
  toast.error(message);
}
export function toastSuccessMessage(message: string) {
  toast.success(message);
}
