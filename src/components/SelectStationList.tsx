import type { Station } from "@/utils/types";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewProps,
} from "react-native";
import colors from "tailwindcss/colors";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  stations: Station[];
  label: string;
  value: Station | null;
  onChange: (value: Station | null) => void;
} & ViewProps;

export default function SelectStationList({
  stations,
  label,
  value,
  onChange,
  ...props
}: Props) {
  const [search, setSearch] = useState<string>("");
  const insets = useSafeAreaInsets();

  const searched =
    search.length === 0
      ? stations
      : stations.filter((station) =>
          station.IstasyonAdi.toLocaleLowerCase().includes(
            search.toLocaleLowerCase()
          )
        );

  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSelectItem = (item: Station) => {
    onChange(item);
    bottomSheetModalRef.current?.close();
  };
  const renderBackdrop = useCallback((props: any) => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );
  }, []);

  return (
    <View {...props}>
      <TouchableOpacity
        className="bg-white rounded-md border border-zinc-200 px-4 flex-row justify-between items-center h-11"
        onPress={() => handlePresentModal()}
      >
        <View className="flex-row items-center space-x-2.5">
          <MaterialIcons
            name="location-pin"
            color={colors.green[500]}
            size={20}
          />
          <Text className="font-medium text-zinc-600 tracking-normal">
            {value?.IstasyonAdi ?? label}
          </Text>
        </View>

        <MaterialIcons
          name="arrow-downward"
          color={colors.zinc[600]}
          size={16}
        />
      </TouchableOpacity>

      <BottomSheetModal
        onDismiss={() => setSearch("")}
        index={0}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBehavior="extend"
      >
        <View
          className="flex-1"
          style={{
            marginBottom: insets.bottom,
          }}
        >
          <View className="flex-row items-center space-x-3 bg-zinc-100 h-10 rounded-full px-4 mx-4">
            <MaterialIcons name="search" color={colors.zinc[500]} size={18} />
            <BottomSheetTextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Arama..."
              style={styles.input}
              onSubmitEditing={() =>
                bottomSheetModalRef.current?.snapToIndex(0)
              }
            />
          </View>

          <BottomSheetFlatList
            contentContainerStyle={styles.listWrapper}
            data={searched}
            keyExtractor={(item) => item.IstasyonId.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handleSelectItem(item)}
                className={classNames(
                  "py-3 px-6 flex-row items-center space-x-2.5",
                  {
                    "border-b border-b-zinc-200": index !== searched.length - 1,
                  }
                )}
              >
                <MaterialIcons
                  name="location-pin"
                  color={colors.green[500]}
                  size={20}
                />
                <Text className="text-base text-zinc-700">
                  {item.IstasyonAdi}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  listWrapper: {
    marginTop: 16,
  },
});
