import { View, Text } from "react-native";
import React from "react";
import { useGetStationsQuery } from "@/services/izbanApi";
import SelectList from "@/components/ui/SelectList";

export default function Home() {
  const { data, isLoading } = useGetStationsQuery();

  return (
    <View className="flex-1 items-center justify-center px-4">
      <SelectList />
    </View>
  );
}
