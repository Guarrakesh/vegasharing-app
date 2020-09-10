import {createStackNavigator} from "@react-navigation/stack";
import React from 'react';
import HandsScreen from "./HandsScreen";

const Stack = createStackNavigator();


const HandsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyHands" component={HandsScreen}/>
            {/*  <Stack.Screen name="Signup" component={SecondHomeScreen}/>*/}
        </Stack.Navigator>
    )
};

export default HandsStack;
