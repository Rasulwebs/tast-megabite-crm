"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryProvider } from "./providers";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryProvider>{children}</QueryProvider>
    </Provider>
  );
}
