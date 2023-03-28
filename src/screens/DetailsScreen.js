import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Image,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-native-snap-carousel";
import { Rating, Icon } from "react-native-elements";
import Modal from "../components/common/Modal";
import Video from "../components/common/Video"

export default function DetailsScreen(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const carousel = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const onClose = () => setShowModal((prevState) => !prevState);
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

  const playVideo =(video)=>{
    // console.log("reproducir Video...")
    // console.log(video)
    setRenderComponent(<Video idVideo={video}/>)
    onClose()
  }
  const showLocation=()=>{
    setRenderComponent(<Text>Aui va el mapa</Text>)
    setShowModal(true)
  }

  const renderItem = ({ index, item }) => {
    return (
      <View style={styles.card}>
        <Image style={styles.img} source={{ uri: item.image }} />
        <View style={styles.icons} >
          <Icon
          type="material-community"
          name="youtube"
          color="red"
          size={40}
          onPress={()=>playVideo(item.video)}
          />
          <Icon
          type="material-community"
          name="google-maps"
          color="green"
          size={40}
          onPress={showLocation}
          />
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Rating
          type="star"
          startingValue={parseFloat(item.rating)}
          fraction={1}
          imageSize={30}
          style={styles.rating}
          readonly={true}
        />
        <Text style={styles.points}>Calificación: {item.rating}/5</Text>
      </View>
    );
  };

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
      {renderComponent &&(
        <Modal visible={showModal} close={onClose}>{renderComponent}</Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: "80%",
    padding: 40,
    marginTop: 50,
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#0D5BD7",
  },
  img: {
    height: "50%",
    width: "90%",
    borderRadius: 5,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  fontSizerating: {
    paddingVertical: 6,
  },
  points: {
    fontSize:14,
    fontWeight:"bold"
  },
  icons:{
    flexDirection:"row",
    justifyContent:"space-between",
    width: "45%",

  }
});
