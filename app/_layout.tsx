import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function MainLayout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "rgb(0,0,0)",
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>

      <StatusBar style="inverted" />
    </View>
  );
}
