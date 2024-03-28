import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Duraklar",
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map Görünümü",
        }}
      />
    </Tabs>
  );
}
