import constants from "@/utils/constants";
import { Station } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const izbanApi = createApi({
  reducerPath: "izbanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: constants.apiUrl,
  }),
  endpoints: (builder) => ({
    getStations: builder.query<Station[], void>({
      query: () => "/istasyonlar",
    }),
  }),
});

export const { useGetStationsQuery } = izbanApi;
