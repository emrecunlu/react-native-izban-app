import { store } from "@/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function AppLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <BottomSheetModalProvider>
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
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
