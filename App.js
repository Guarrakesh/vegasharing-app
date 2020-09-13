import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React from 'react';
import AuthContextProvider from "./auth/AuthenticationContext";
import AuthStack from "./auth/screens/AuthStack";
import HomeStack from "./home/screens/HomeStack";
import HandsStack from "./hands/screens/HandsStack";
import RoomsStack from "./rooms/screens/RoomsStack";
import SettingsScreen from "./settings/screens/SettingsScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import APIContextProvider from "./shared/api/APIContext";
import ErrorContextProvider from "./shared/notification/ErrorContext";
import {ErrorNotification} from "./shared/notification/ErrorNotification";
import mainTheme from "./shared/theme/mainTheme";
import ThemeContext from './shared/theme/ThemeContext';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const MainNavigator = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack}/>
        <Tab.Screen name="MyHands" component={HandsStack}/>
        <Tab.Screen name="Rooms" component={RoomsStack}/>
        <Tab.Screen name="Settings" component={SettingsScreen}/>
        <Tab.Screen name="Auth" component={AuthStack}/>
      </Tab.Navigator>
  )
};

export default function App() {

  return (
      <ThemeContext.Provider value={mainTheme}>
      <APIContextProvider>
        <AuthContextProvider>
          <ErrorContextProvider>
            <NavigationContainer>
              <RootStack.Navigator>
                <RootStack.Screen name="MainNavigation" component={MainNavigator} options={{ headerShown: false}}/>
                <RootStack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false}} />

              </RootStack.Navigator>
            </NavigationContainer>
            <ErrorNotification/>
          </ErrorContextProvider>
        </AuthContextProvider>
      </APIContextProvider>
      </ThemeContext.Provider>
  );
}
