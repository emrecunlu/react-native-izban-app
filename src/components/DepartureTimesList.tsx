import type { Departure } from "@/utils/types";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { isWithinInterval, parse } from "date-fns";
import classNames from "classnames";

type Props = {
  data: Departure[];
};

export default function DepartureTimesList({ data }: Props) {
  const activeIndex = data.findIndex((x) =>
    isWithinInterval(new Date(), {
      start: parse(x.HareketSaati, "HH:mm:ss", new Date()),
      end: parse(x.VarisSaati, "HH:mm:ss", new Date()),
    })
  );

  return (
    <ScrollView
      className="mt-6"
      stickyHeaderIndices={[0]}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
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
              className={classNames(
                "rounded-md bg-white border border-zinc-200 py-2.5 px-4",
                {
                  "bg-green-500": activeIndex === index,
                }
              )}
              style={{
                width: (Dimensions.get("screen").width - 32) / 2,
              }}
            >
              <Text
                className={classNames("text-center", {
                  "text-white font-semibold": activeIndex === index,
                })}
              >
                {item.HareketSaati.split(":").slice(0, 2).join(":")}
              </Text>
            </View>
            <View
              className={classNames(
                "rounded-md bg-white border border-zinc-200 py-2.5 px-4",
                {
                  "bg-green-500": activeIndex === index,
                }
              )}
              style={{
                width: (Dimensions.get("screen").width - 32) / 2,
              }}
            >
              <Text
                className={classNames("text-center", {
                  "text-white font-semibold": activeIndex === index,
                })}
              >
                {item.VarisSaati.split(":").slice(0, 2).join(":")}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
