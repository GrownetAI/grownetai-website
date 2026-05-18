"use client";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          fontFamily: "var(--font-manrope)",
          borderRadius: "12px",
          fontSize: "14px",
        },
        success: {
          style: {
            background: "#EDF9F0",
            color: "#27924A",
            border: "1px solid #3BC456",
          },
          iconTheme: { primary: "#3BC456", secondary: "#fff" },
        },
        error: {
          style: {
            background: "#FEF2F2",
            color: "#DC2626",
            border: "1px solid #FCA5A5",
          },
        },
      }}
    />
  );
}
