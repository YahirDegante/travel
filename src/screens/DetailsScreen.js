import { StyleSheet, Text, View, Button, ImageBackground, Image } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-native-snap-carousel";

export default function DetailsScreen(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const carousel = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
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
      //console.log(json);
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  const renderItem = ({index, item})=>{
    return(
      <View style={styles.card}>
        <Image
        style={styles.img}
        source={{uri: item.image}} 
        />
        <Text>{item.name}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={require("../../assets/imagenes/back.jpg")}
      >
        <Carousel
          layout="tinder"
          ref={carousel}
          sliderWidth={400}
          itemWidth={400}
          onSnapToItem={(index) => setActiveIndex({ activeIndex: index })}
          data={data}
          renderItem={renderItem}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width:"100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card:{
    backgroundColor:"#fff",
    borderRadius:10,
    height:"80%",
    padding:40,
    marginTop:50,
    marginHorizontal:25,
    alignItems:"center",
    justifyContent:"center",
    borderWidth:1.5,
    borderColor: "#0D5BD7"
  },
  img:{
    height: "50%",
    width:"90%",
    borderRadius: 5,
  }
});
