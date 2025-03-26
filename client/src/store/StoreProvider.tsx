"use client";

import { store } from "./store";
import { Provider } from "react-redux";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

// Instead of creating this file we can put our provider directly in to the layout.tsx file, but in this situation you would have to make entire layout client side and we don't want to do that
