import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function loginScreen() {
  const navigation = useNavigation();
  //console.log(navigation);
  const irARegistro = ()=>{
    //console.log("ir a registro")
    navigation.navigate("registerS")
  }
  return (
    <View>
      <Image source={require("../../assets/imagenes/fuegito.png")}
      style={styles.Logo}
      />
      <Text>FORMULARIO DE LOGIN</Text>
      <View>
        <Text onPress={irARegistro}>Registrate</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create(
  {
   Logo:{
      width:"100%",
      height:150,
      resizeMode:"contain",
      marginTop:30
    }
  }
)