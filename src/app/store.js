import { configureStore } from "@reduxjs/toolkit";

import { reqApiRAWG } from "../services/reqApiRAWG";

export const store = configureStore({
  reducer: {
    [reqApiRAWG.reducerPath]: reqApiRAWG.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(reqApiRAWG.middleware);
  },
});
