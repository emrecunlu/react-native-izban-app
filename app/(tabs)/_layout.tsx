import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "İstasyon Bilgileri",
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Duraklar",
        }}
      />
    </Tabs>
  );
}
