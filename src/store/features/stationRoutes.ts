import { Station } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

export type State = {
  stations: Station[] | null;
};

const initialState: State = {
  stations: null,
};

const stationRoutes = createSlice({
  name: "stationRoutes",
  initialState,
  reducers: {
    setStationRoutes: (state, action: PayloadAction<Station[] | null>) => {
      state.stations = action.payload;
    },
  },
});

export default stationRoutes.reducer;
export const { setStationRoutes } = stationRoutes.actions;
export const useStationRoutes = () =>
  useSelector((state: RootState) => state.stationRoutes);
