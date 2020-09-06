import {createStackNavigator} from "@react-navigation/stack";
import React from 'react';
import LoginScreen from "./LoginScreen";

const Stack = createStackNavigator();


const AuthStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
      {/*  <Stack.Screen name="Signup" component={SecondHomeScreen}/>*/}
      </Stack.Navigator>
  )
};

export default AuthStack;
