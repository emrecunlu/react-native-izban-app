import { View, Modal, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";
import colors from "tailwindcss/colors";

type Props = {
  active: boolean;
};

export default function AppLoader({ active }: Props) {
  return (
    <Modal animationType="none" transparent visible={active}>
      <View className="flex-1 items-center justify-center bg-black/75">
        <ActivityIndicator color={colors.white} />
      </View>
    </Modal>
  );
}
