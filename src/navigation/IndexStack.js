import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IndexScreen from '../screens/IndexScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function IndexStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
            name='indexXS'
            component={IndexScreen}
            options={{title:"Inicio"}}/>
            <Stack.Screen
            name='loginS'
            component={LoginScreen}
            options={{title:"Inicior Sesion"}}
            />
            <Stack.Screen
            name='registerS'
            component={RegisterScreen}
            options={{title:"registro"}}
            />
        </Stack.Navigator>
    )
}