import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React from 'react';
import AuthStack from "./auth/screens/AuthStack";
import HomeStack from "./home/screens/HomeStack";
import SettingsScreen from "./settings/screens/SettingsScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const MainNavigator = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Settings" component={SettingsScreen}/>
        <Tab.Screen name="Auth" component={AuthStack}/>
      </Tab.Navigator>
  )
}
export default function App() {

  return (
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="MainNavigation" component={MainNavigator}/>
          <RootStack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false}} />

        </RootStack.Navigator>


      </NavigationContainer>
  );
}
