import { Departure, Station } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const izbanService = createApi({
  reducerPath: "izbanService",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL ?? "",
  }),
  endpoints: (builder) => ({
    getStations: builder.query<Station[], void>({
      query: () => "/istasyonlar",
    }),
    getDepartureTimes: builder.query<
      Departure[],
      { departureId: number; arrivalId: number }
    >({
      query: ({ arrivalId, departureId }) => ({
        url: `/sefersaatleri/${departureId}/${arrivalId}`,
      }),
    }),
  }),
});

export const { useGetStationsQuery, useLazyGetDepartureTimesQuery } =
  izbanService;
