import type { Departure } from "@/utils/types";
import { View, Text, ScrollView, Dimensions } from "react-native";

type Props = {
  data: Departure[];
};

export default function DepartureTimesList({ data }: Props) {
  return (
    <View>
      <View className="flex-row space-x-2">
        <View className="bg-white rounded-md border border-zinc-200 py-2.5 px-4 flex-1">
          <Text className="text-center font-semibold text-green-600">
            Hareket Saati
          </Text>
        </View>
        <View className="bg-white rounded-md border border-zinc-200 py-2.5 px-4 flex-1">
          <Text className="text-center font-semibold text-green-600">
            Varış Saati
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-y-1 mt-2 mb-8">
        {data.map((item, index) => (
          <View className="flex-row gap-x-2" key={index}>
            <View
              className="bg-white rounded-md border border-zinc-200 py-2.5 px-4"
              style={{
                width: (Dimensions.get("screen").width - 32) / 2,
              }}
            >
              <Text className="text-center">
                {item.HareketSaati.split(":").slice(0, 2).join(":")}
              </Text>
            </View>
            <View
              className="bg-white rounded-md border border-zinc-200 py-2.5 px-4"
              style={{
                width: (Dimensions.get("screen").width - 32) / 2 - 8,
              }}
            >
              <Text className="text-center">
                {" "}
                {item.VarisSaati.split(":").slice(0, 2).join(":")}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
