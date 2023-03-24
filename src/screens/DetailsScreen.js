import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";

export default function DetailsScreen(props) {
  const { navigation } = props;
  const [data, setData]=useState([]);
  const getPlaces = async () => {
    try {
      const response = await fetch(
        "http://192.168.62.185:3000/travel/api/place",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getPlaces()
  },[])
  return (
    <View>
      <Text>Aqui van los lugares</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
