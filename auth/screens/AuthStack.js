import {createStackNavigator} from "@react-navigation/stack";
import {BlurView} from "expo-blur";
import React from 'react';
import {useTheme} from "../../shared/theme/ThemeContext";
import LoginScreen from "./LoginScreen";
import routes from '../../shared/routes';
import SignupScreen from "./SignupScreen";
const Stack = createStackNavigator();
import {Platform, StyleSheet} from 'react-native';

const AuthStack = ({ navigation}) => {

  const theme = useTheme();
  navigation.addListener('beforeRemove', (e) => {
    console.log("aa");
    e.preventDefault();
  });
  return (
      <Stack.Navigator screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: "",
        headerTransparent: true,
        headerBackground: () => <BlurView tint={theme.mode} intensity={100} style={[StyleSheet.absoluteFill]} />,
      }}>
        <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen}
                      options={{ gestureEnabled: false, headerLeft: null  }}/>
        <Stack.Screen
            options={{headerShown: Platform.select({ ios: true, android: false })}}
            name={routes.SIGNUP_SCREEN} component={SignupScreen}/>
      </Stack.Navigator>
  )
};

export default AuthStack;
