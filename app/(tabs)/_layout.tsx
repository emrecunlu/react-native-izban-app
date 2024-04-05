import { Tabs } from "expo-router";
import colors from "tailwindcss/colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.green[500],
        },
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: "beside-icon",
        headerTitleAlign: "center",
        tabBarActiveTintColor: colors.green[500],
        tabBarStyle: {
          borderTopColor: colors.green[500],
        },
        headerTitleStyle: {
          color: colors.white,
          fontSize: 18,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "İstasyonlar",
          tabBarIcon: (props) => <MaterialIcons name="train" {...props} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Duraklar",
          tabBarIcon: (props) => <MaterialIcons name="map" {...props} />,
        }}
      />
    </Tabs>
  );
}
