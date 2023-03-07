import { React,useEffect, useState} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import IndexScreen from "../screens/IndexScreen";
import DetailsScreen from "../screens/DetailsScreen";
import InformationScreen from "../screens/InformationScreen";
import IndexStack from "./IndexStack";
import DetailsStack from "./DetailStack";
import { Header } from "react-native/Libraries/NewAppScreen";
import { Icon } from "react-native-elements";
import ProfileScreen from "../screens/ProfileScreen";
import {getAuth, onAuthStateChanged} from 'firebase/auth'


const Tab = createBottomTabNavigator();

//const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  const [session, setSession]=useState(null)
  
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      setSession(user ? true : false)
    })
    setSession(true);
  },[])

  return session ? (
    <Tab.Navigator screenOptions={({route})=>({
      headerShown:false,
      tabBarActiveTintColor:"red",
      tabBarInactiveTintColor:"green",
      //tabBarIcon:()=> showIcons()
      tabBarIcon:({color, size})=> showIcons(route,color,size)
      })}>
      <Tab.Screen
        name="index"
        component={IndexStack}
        options={{ title: "Inicio"}}
      />

      <Tab.Screen
        name="details"
        component={DetailsStack}
        options={{ title: "Detalles" }}
      />

      <Tab.Screen
        name="info"
        component={InformationScreen}
        options={{ title: "Información", headerShown:true }}
      />

      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: "Perfil",headerShown:true}}
      />
    </Tab.Navigator>
   
  ):(
    <Tab.Navigator screenOptions={({route})=>({
      headerShown:false,
      tabBarActiveTintColor:"red",
      tabBarInactiveTintColor:"green",
      //tabBarIcon:()=> showIcons()
      tabBarIcon:({color, size})=> showIcons(route,color,size)
      })}>
      <Tab.Screen
        name="index"
        component={IndexStack}
        options={{ title: "Inicio"}}
      />
    </Tab.Navigator>
  )
}
function showIcons(route, color, size){
  let icono;
  if(route.name=="index"){
    icono="home-circle"
  }
  if(route.name=="details"){
    icono="details"
  }
  if(route.name=="info"){
    icono="information"
  }
  if(route.name=="profile"){
    icono="cont"
  }
  return(
    <Icon type="material-community"
    name={icono}
    color={color}
    size={size}
    />
  )
}
