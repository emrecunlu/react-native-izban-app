import axios from "@/utils/libs/axios";
import type { Station } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const getCurrentStations = () => {
  return axios.get<Station[]>("/istasyonlar");
};

export const useGetCurrentStations = () => {
  return useQuery({
    queryKey: ["stations"],
    initialData: [],
    queryFn: async () => {
      return (await getCurrentStations()).data;
    },
  });
};
