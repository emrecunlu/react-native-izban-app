import { View, Text } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Map() {
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  const ref = useRef<BottomSheet | null>(null);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={() => ref.current?.expand}>
        <Text className="text-blue-600 font-semibold text-4xl">
          Open BottomSheet
        </Text>
      </TouchableOpacity>

      <BottomSheet
        ref={ref}
        enablePanDownToClose
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <View className="flex-1">
          <Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
            repellendus laboriosam velit cupiditate id, explicabo vel ut placeat
            atque cumque fuga ipsa commodi officia autem expedita eveniet nihil
            aut! Cumque.
          </Text>
        </View>
      </BottomSheet>
    </View>
  );
}
