import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

export default function DetailsScreen(props) {
  const { navigation } = props;

  return (
    <View>
      <Text>DetailsScreen</Text>
      <Button
        title="home"
        onPress={() => {
          navigation.navigate("index");
        }}
      />

      <Button
        title="Infor"
        onPress={() => {
          navigation.navigate("info");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
