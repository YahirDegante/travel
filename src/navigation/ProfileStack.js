import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function ProfleStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
            name='profileS'
            component={ProfileScreen}
            options={{title:"Perfil"}}/>
        </Stack.Navigator>
    )
}