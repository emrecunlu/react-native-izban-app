import React from "react";
import { Tabs } from "expo-router";
import { Dimensions, Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: !Platform.OS,
      }}
    >
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
