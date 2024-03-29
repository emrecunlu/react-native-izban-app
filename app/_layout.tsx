import { store } from "@/store";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function AppLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Provider store={store}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
}
