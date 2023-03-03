import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import LoginForm from "../components/acoount/LoginForm"

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
      <View style={styles.viewLogin}>
        <LoginForm />
        <Text style={styles.text1}>
          ¿Aun no tienes cuenta?
          <Text style={styles.text2} onPress={irARegistro}>Registrate</Text>
        </Text>
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
    },
    viewLogin: {
      marginHorizontal:30
    },
    text1: {
      marginTop:15,
      marginHorizontal:10
    },
    text2: {
      color:"#0D5BD7",
      fontWeight:"bold"
    },
  }
)