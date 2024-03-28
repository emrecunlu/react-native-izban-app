import { store } from "@/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function AppLayout() {
  return (
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
  );
}
