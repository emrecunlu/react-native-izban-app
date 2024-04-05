import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useRef } from "react";
import { useStationRoutes } from "@/store/features/stationRoutes";
import Map, {
  Callout,
  Marker,
  Polygon,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import colors from "tailwindcss/colors";

export default function MapView() {
  const { stations } = useStationRoutes();

  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    /* if (stations && stations.length > 0) {
      mapRef.current?.animateToRegion({
        latitude: parseFloat(stations[0].Enlem),
        longitude: parseFloat(stations[0].Boylam),
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      });
    } */

    console.log("stations changed");
  }, [stations]);

  if (!stations) return null;

  return (
    <View className="flex-1">
      <Map
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={{
          alignSelf: "stretch",
          height: "100%",
        }}
      >
        <Polyline
          coordinates={stations.map((station) => ({
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
