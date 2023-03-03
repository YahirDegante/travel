import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailsScreen from '../screens/DetailsScreen';
import loginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function DetailsStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
            name='detailsS'
            component={DetailsScreen}
            options={{title:"Detalles"}}/>
        </Stack.Navigator>
    )
}