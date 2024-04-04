import { Station } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

type StationState = {
  departure: Station;
  arrival: Station;
};

type State = {
  stations: StationState | null;
};

const initialState: State = {
  stations: null,
};

const stationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {},
});
