import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { cn } from "@/utils/helpers";

interface Props<T> extends TouchableOpacityProps {
  label: string;
  items: T[];
  value: T | null;
  onChange: (value: T) => void;
  itemTitle: (item: T) => string;
}

export default function SelectList<T>({
  label,
  items,
  itemTitle,
  value,
  onChange,
  ...props
}: Props<T>) {
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const handleSelectItem = (value: T) => {
    onChange(value);

    bottomSheetRef.current?.close();
  };

  return (
    <>
      <TouchableOpacity
        className="w-full flex-row items-center justify-between border rounded-xl h-12 px-4 border-zinc-200 bg-white -z-10"
        {...props}
        onPress={() => setBottomSheetVisible(true)}
      >
        <Text className="text-zinc-600">
          {value ? itemTitle(value) : label}
        </Text>
        <MaterialIcons name="arrow-downward" size={18} />
      </TouchableOpacity>
      {bottomSheetVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose
          index={0}
          onClose={() => setBottomSheetVisible(false)}
          backdropComponent={renderBackdrop}
        >
          <View className="flex-1">
            <BottomSheetTextInput
              style={styles.searchInput}
              placeholder="Arama"
              onSubmitEditing={() => bottomSheetRef.current?.snapToIndex(0)}
            />

            <BottomSheetFlatList
              style={{ marginTop: 16 }}
              data={items}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => handleSelectItem(item)}
                  className={cn(
                    "flex-row space-x-4 items-center py-3 px-4 border-b border-b-zinc-200",
                    {
                      "border-b-0": index === items.length - 1,
                    }
                  )}
                >
                  <MaterialIcons
                    name="location-pin"
                    size={18}
                    color="#cccccc"
                  />
                  <Text className="text-base font-medium text-zinc-600">
                    {itemTitle(item)}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </BottomSheet>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: "#eeeeee",
    height: 42,
    borderRadius: 22,
    paddingHorizontal: 22,
    marginHorizontal: 16,
  },
});
