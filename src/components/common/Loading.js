import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import {Overlay} from 'react-native-elements'

export default function Loading(props) {
  const {visible,text}=props
  return (
    <Overlay
    isVisible={visible}
    overlayStyle={styles.overlay}
    >
      <View style={styles.viewLoad}>
      <ActivityIndicator size='large' color="blue"/>
      {Text && <Text style={styles.Text}>{text}</Text>}
      </View>
    </Overlay>
  )
}

Loading.defaultProps = {
  visible:false
}

const styles = StyleSheet.create({
  overlay:{
    height:100,
    width:200,
    backgroundColor:"white",
    borderColor:"blue",
    borderWidth:2,
    borderRadius:8
  },
  viewLoad:{
    alignItems:"center",
    justifyContent: "center"

  },
  Text:{
    color:"blue",
    textTransform:"uppercase",
    marginVertical:15
  }
})