import { izbanService } from "@/services/izbanService";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [izbanService.reducerPath]: izbanService.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(izbanService.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
