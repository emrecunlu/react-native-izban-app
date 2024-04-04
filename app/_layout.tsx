import { store } from "@/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function MainLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Provider store={store}>
        <BottomSheetModalProvider>
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
        </BottomSheetModalProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
