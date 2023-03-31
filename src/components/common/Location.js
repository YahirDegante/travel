import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";

export default function Location() {
  const [region, setRegion] = useState({
    latitude: 18.8502885,
    longitude: -99.2029242,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0521,
  });
  const obtainLocation = (coordinate) => {
    console.log("las coodenadas son: ", coordinate);
  };
  const onRegionChange = (region) => {
    console.log(region);
  };
  return (
    <View style={styles.viewContainer}>
      <MapView
        style={styles.map}
        region={region}
        onPress={(e) => obtainLocation(e.nativeEvent.coordinate)}
        onRegionChange={onRegionChange}
      >
        <Marker
          key={1}
          coordinate={{
            latitude: 18.8502885,
            longitude: -99.2029242,
          }}
          title="MI PODEROSA UTEZ"
          description="UwU"
          //image={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ606-O87rg72Ip5IJDqxJb-sfFr5Ry16_LpGtMTyzzLg&s"}}
        >
          <Image style={styles.logo} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ606-O87rg72Ip5IJDqxJb-sfFr5Ry16_LpGtMTyzzLg&s"}}/>
        </Marker>
        <Circle
        radius={1000}
        center={{latitude: 18.8502885,
          longitude: -99.2029242}}
          strokeWidth={3}
          strokeColor="#0D5BD7"
          fillColor={"rgba(13,91,215,0.2)"}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
    padding: 0,
    marginBottom: -75,
  },
  map: {
    width: "95%",
    height: "90%",
  },
  logo:{
    height:50,
    width:100,
      }
});
