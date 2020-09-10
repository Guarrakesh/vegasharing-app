import {createStackNavigator} from "@react-navigation/stack";
import React from 'react';
import RoomsScreen from "./RoomsScreen"

const Stack = createStackNavigator();


const RoomsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Rooms" component={RoomsScreen}/>
            {/*  <Stack.Screen name="Signup" component={SecondHomeScreen}/>*/}
        </Stack.Navigator>
    )
};

export default RoomsStack;
