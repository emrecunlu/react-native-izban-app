import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { useStationRoutes } from "@/store/features/stationRoutes";
import Map, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import colors from "tailwindcss/colors";
import { useFocusEffect, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";

const MAX_ZOOM = 13;
const MIN_ZOOM = 10;

export default function MapView() {
  const { stations } = useStationRoutes();
  const navigation = useNavigation();

  // find location delta values
  /* const getLatLongDelta = (zoom: number, latitude: number): number[] => {
    const LONGITUDE_DELTA = Math.exp(Math.log(360) - zoom * Math.LN2);
    const ONE_LATITUDE_DEGREE_IN_METERS = 111.32 * 1000;
    const accurateRegion =
      LONGITUDE_DELTA *
      (ONE_LATITUDE_DEGREE_IN_METERS * Math.cos(latitude * (Math.PI / 180)));
    const LATITUDE_DELTA = accurateRegion / ONE_LATITUDE_DEGREE_IN_METERS;

    return [LONGITUDE_DELTA, LATITUDE_DELTA];
  }; */

  const mapRef = useRef<Map | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (stations && stations.length > 0) {
        mapRef.current?.setCamera({
          center: {
            latitude: parseFloat(stations[0].Enlem),
            longitude: parseFloat(stations[0].Boylam),
          },
          zoom: MAX_ZOOM,
        });
      }
    }, [stations])
  );

  if (!stations)
    return (
      <View className="flex-1 items-center justify-center flex-col space-y-6">
        <Text className="font-medium text-lg text-zinc-600">
          İstasyon Bilgisi Bulunamadı!
        </Text>

        <TouchableOpacity
          className="bg-green-500 px-8 py-2.5 rounded-full"
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
        zoomEnabled={true}
        maxZoomLevel={MAX_ZOOM}
        minZoomLevel={MIN_ZOOM}
        style={{
          flex: 1,
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

      <StatusBar style="inverted" animated translucent />
    </View>
  );
}
