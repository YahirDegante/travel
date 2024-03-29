import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import {getAuth, signOut} from "firebase/auth"
import { useNavigation } from '@react-navigation/native'
import ProfileInfo from '../components/acoount/ProfileInfo'
import Loading from '../components/common/Loading'
import ProfileOptions from '../components/acoount/ProfileOptions'

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [visible, setvisible] = useState(false)
    const [textLoading, settextLoading] = useState("")
    const [reLoad, setReLaoad] = useState(false)
    const onReload  = ()=> setReLaoad((prevState) => !prevState)
    
    const cerrarSesion = async()=>{
    //console.log("cerrar sesion")
    const auth = getAuth();
    await signOut(auth);
    navigation.navigate("Inicio",{screen:"indexXS"})
  }
    return (
    <View>
      <ProfileInfo settextLoading={settextLoading} setvisible={setvisible}/>
      <ProfileOptions onReload={onReload}/>
      <Button
      title="cerrar sesion"
      onPress={cerrarSesion}
      buttonStyle={styles.button}
      titleStyle={styles.title}
      />
      <Loading visible={visible} text={textLoading}/>
    </View>
  )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:"white",
        borderTopWidth:1,
        borderBottomWidth:1,
        borderTopColor:"#e3e3e3",
        borderBottomColor:"#e3e3e3",
        marginTop:30,
        paddingVertical:10
    },
    title:{
        color:"#0D5BD7"
    }
})