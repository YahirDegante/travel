import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Text } from 'react-native-elements'
import * as ImagePicker from "expo-image-picker"
import { getAuth, updatePorfile } from 'firebase/auth'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { async } from '@firebase/util'

export default function ProfileInfo() {
    const{uid, photoURL, displayName, email} = getAuth().currentUser
    console.log(uid);
    const changePhoto = async () => {
        //console.log("CAMBIAR FOTO")
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
        });
        //console.log(result)
        if(!result.canceled)uploadPhoto(result.uri)
      };
    const uploadPhoto = async(uri)=>{
        //console.log(uri)
        const response = await fetch(uri);
        const blob = await response.blob();
        //console.log(blob)
        const storage = getStorage();
        const refStorage = ref(storage, `imgProfile/${uid}`)
        uploadBytes(refStorage, blob).then((snapshot)=>{
            console.log(snapshot.metadata)
        })
    }   
  return (
    <View style={styles.viewPhoto}>
      <Avatar
      size="large"
      rounded={true}
      icon={{type:"material",name:"person"}}
      containerStyle={styles.avatar}
      >
      <Avatar.Accessory size={25} onPress={changePhoto}/>
      </Avatar>
      <View>
        <Text style={styles.name}>{displayName || "USUARIO"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    viewPhoto:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#f2f2f2",
        paddingVertical:30
    },
    avatar:{
        backgroundColor:"#faad07",
        marginRight:20
    },
    name:{
        fontWeight:"bold",
        paddingBottom:5
    }
})