import {createStackNavigator} from "@react-navigation/stack";
import React from 'react';
import LoginScreen from "./LoginScreen";
import routes from '../../shared/routes';
import SignupScreen from "./SignupScreen";
const Stack = createStackNavigator();
import { Platform } from 'react-native';

const AuthStack = ({ navigation}) => {

  navigation.addListener('beforeRemove', (e) => {
    console.log("aa");
    e.preventDefault();
  });
  return (
      <Stack.Navigator>
        <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen}
                      options={{ headerShown: false, gestureEnabled: false  }}/>
        <Stack.Screen
            options={{headerShown: Platform.select({ ios: true, android: false })}}
            name={routes.SIGNUP_SCREEN} component={SignupScreen}/>
      </Stack.Navigator>
  )
};

export default AuthStack;
