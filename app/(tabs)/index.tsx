import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  useGetStationsQuery,
  useLazyGetDepartureTimesQuery,
} from "@/services/izbanService";
import SelectStationList from "@/components/SelectStationList";
import { Station } from "@/utils/types";
import DepartureTimesList from "@/components/DepartureTimesList";
import { store } from "@/store";
import { setStationRoutes } from "@/store/features/stationRoutes";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";
import AppLoader from "@/components/AppLoader";

export default function HomeView() {
  const [selecteds, setSelecteds] = useState<Record<string, Station | null>>({
    departure: null,
    arrival: null,
  });

  const { data: stations = [], isLoading: initialLoading } =
    useGetStationsQuery();
  const [trigger, { data: departureTimes, isFetching: mutationLoader }] =
    useLazyGetDepartureTimesQuery();

  const handleSubmit = () => {
    if (selecteds.departure?.IstasyonId && selecteds.arrival?.IstasyonId) {
      const startedIndex = stations.findIndex(
        (x) => x.IstasyonId === selecteds.departure?.IstasyonId
      );
      const endIndex = stations.findIndex(
        (x) => x.IstasyonId === selecteds.arrival?.IstasyonId
      );

      const stationRoutes = stations.slice(
        startedIndex > endIndex ? endIndex : startedIndex,
        endIndex < startedIndex ? startedIndex + 1 : endIndex + 1
      );

      store.dispatch(
        setStationRoutes(
          startedIndex > endIndex ? stationRoutes.reverse() : stationRoutes
        )
      );

      trigger({
        arrivalId: selecteds.arrival.IstasyonId,
        departureId: selecteds.departure.IstasyonId,
      });
    }
  };

  return (
    <View className="flex-1 p-4">
      <View className="flex-col space-y-6">
        <View className="flex-col space-y-2">
          <SelectStationList
            label="Kalkış İstasyonu"
            stations={stations}
            value={selecteds.departure}
            onChange={(station) =>
              setSelecteds({
                ...selecteds,
                departure: station,
              })
            }
          />
          <SelectStationList
            label="Varış İstasyonu"
            stations={stations}
            value={selecteds.arrival}
            onChange={(station) =>
              setSelecteds({
                ...selecteds,
                arrival: station,
              })
            }
          />
        </View>

        <TouchableOpacity
          className="bg-green-500 rounded-full py-2.5"
          onPress={handleSubmit}
        >
          <Text className="text-white font-semibold text-center text-[15px]">
            Görüntüle
          </Text>
        </TouchableOpacity>
      </View>

      {departureTimes && <DepartureTimesList data={departureTimes} />}

      <AppLoader active={initialLoading || mutationLoader} />
      <StatusBar style="inverted" animated translucent />
    </View>
  );
}
