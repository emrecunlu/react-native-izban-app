import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  useGetStationsQuery,
  useLazyGetDepartureTimesQuery,
} from "@/services/izbanService";
import { StatusBar } from "expo-status-bar";
import SelectStationList from "@/components/SelectStationList";
import { Station } from "@/utils/types";
import DepartureTimesList from "@/components/DepartureTimesList";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
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
      trigger({
        arrivalId: selecteds.arrival.IstasyonId,
        departureId: selecteds.departure.IstasyonId,
      });
    }
  };

  return (
    <ScrollView className="flex-1 p-4" bounces={false}>
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

      {departureTimes && (
        <View>
          <View className="w-full h-0.5 bg-zinc-200 my-6"></View>
          <DepartureTimesList data={departureTimes} />
        </View>
      )}

      <AppLoader active={initialLoading || mutationLoader} />

      <StatusBar style="light" />
    </ScrollView>
  );
}
