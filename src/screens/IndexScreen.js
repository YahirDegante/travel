import { Button, StyleSheet, Text, View } from "react-native";
import { React,useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import LoginScreen from './LoginScreen'
import Loading from "../components/common/Loading";


export default function IndexScreen(props) {
  const { navigation } = props;
  const [session, setSession]=useState(null)

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      setSession(user ? true : false)
    })
    setSession(true);
    //console.log("Montado")
  },[])

  if(session===null){
    return <Loading text={"Validando sesion"}/>
  }
  return session ? (
    <View>
      <Text>IndexScreen</Text>
      <Button
        title="Detalles"
        onPress={() => {
          navigation.navigate("details");
        }}
      />
      <Button
        title="Información"
        onPress={() => {
          navigation.navigate("info");
        }}
      />
      <Button
      title="inicio"
      onPress={() => {
        navigation.navigate("details",{screen:"inicio"})
      }}
      />
    </View>
  ) : <LoginScreen/>
}

const styles = StyleSheet.create({});
