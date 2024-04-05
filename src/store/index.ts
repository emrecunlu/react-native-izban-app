import { izbanService } from "@/services/izbanService";
import { configureStore } from "@reduxjs/toolkit";
import stationRoutes from "./features/stationRoutes";

export const store = configureStore({
  reducer: {
    [izbanService.reducerPath]: izbanService.reducer,
    stationRoutes,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(izbanService.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
