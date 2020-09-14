import {createStackNavigator} from "@react-navigation/stack";
import React from 'react';
import LoginScreen from "./LoginScreen";
import routes from '../../shared/routes';
import SignupScreen from "./SignupScreen";
const Stack = createStackNavigator();


const AuthStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={routes.SIGNUP_SCREEN} component={SignupScreen}/>
      </Stack.Navigator>
  )
};

export default AuthStack;
