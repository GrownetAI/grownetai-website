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
            background: "#E6FBFB",
            color: "#006666",
            border: "1px solid #00E5E5",
          },
          iconTheme: { primary: "#00E5E5", secondary: "#fff" },
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
