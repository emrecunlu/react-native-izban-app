import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useGetStationsQuery } from "@/services/izbanApi";
import SelectList from "@/components/ui/SelectList";
import { Station } from "@/utils/types";

export default function Home() {
  const { data, isLoading } = useGetStationsQuery();
  const [departureStation, setDepartureStation] = useState<Station | null>(
    null
  );
  const [arrivalStatino, setArrivalStation] = useState<Station | null>(null);

  return (
    <View className="flex-1 p-4 flex-col space-y-2">
      <SelectList
        label="Kalkış İstasyon"
        items={data ?? []}
        itemTitle={(item) => item.IstasyonAdi}
        value={departureStation}
        onChange={setDepartureStation}
      />
      <SelectList
        label="Varış İstasyon"
        items={data ?? []}
        itemTitle={(item) => item.IstasyonAdi}
        value={arrivalStatino}
        onChange={setArrivalStation}
      />
      <TouchableOpacity className="w-full bg-blue-500 rounded-2xl py-3">
        <Text className="text-white font-semibold text-center">Göster</Text>
      </TouchableOpacity>
    </View>
  );
}
