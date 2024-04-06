import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { useStationRoutes } from "@/store/features/stationRoutes";
import Map, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import colors from "tailwindcss/colors";
import { useFocusEffect, useNavigation } from "expo-router";

export default function MapView() {
  const { stations } = useStationRoutes();
  const navigation = useNavigation();

  const mapRef = useRef<Map | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (stations && stations.length > 0) {
        mapRef.current?.setCamera({
          center: {
            latitude: parseFloat(stations[0].Enlem),
            longitude: parseFloat(stations[0].Boylam),
          },
          zoom: 12,
        });
      }
    }, [stations])
  );

  if (!stations)
    return (
      <View className="flex-1 items-center justify-center flex-col space-y-6">
        <Text className="font-medium text-xl text-zinc-600">
          İstasyon Bilgisi Bulunamadı!
        </Text>

        <TouchableOpacity
          className="bg-green-500 px-8 py-3 rounded-full"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-semibold">İstasyon Seç</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <View className="flex-1">
      <Map
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        zoomEnabled={false}
        style={{
          alignSelf: "stretch",
          height: "100%",
        }}
      >
        <Polyline
          coordinates={[...stations]
            .sort((a, b) => a.IstasyonSirasi - b.IstasyonSirasi)
            .map((station) => ({
              latitude: parseFloat(station.Enlem),
              longitude: parseFloat(station.Boylam),
            }))}
          strokeColor={colors.rose[500]}
          strokeWidth={5}
        />

        {stations.map((station) => (
          <Marker
            title={station.IstasyonAdi}
            pinColor={colors.red[600]}
            key={station.IstasyonSirasi}
            coordinate={{
              latitude: parseFloat(station.Enlem),
              longitude: parseFloat(station.Boylam),
            }}
          />
        ))}
      </Map>
    </View>
  );
}
