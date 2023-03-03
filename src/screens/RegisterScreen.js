import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import RegsiterForm from '../components/acoount/RegsiterForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
    <Image source={require("../../assets/imagenes/fuegito.png")}
      style={styles.Logo}/>
      <View style={styles.viewForm}>
        <RegsiterForm/>
        </View>
    </KeyboardAwareScrollView>
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
      viewForm:{
        marginHorizontal:40,
      }
    }
  )