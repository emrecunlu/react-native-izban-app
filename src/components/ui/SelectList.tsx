import { Text, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function SelectList() {
  return (
    <TouchableWithoutFeedback className="w-full flex-row items-center justify-between border rounded-xl h-14 px-4 border-zinc-200 bg-white">
      <Text className="text-zinc-600">Kalkış İstasyon</Text>
      <MaterialIcons name="arrow-downward" size={18} />
    </TouchableWithoutFeedback>
  );
}
