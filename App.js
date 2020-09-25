import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {AppLoading} from "expo";
import React, { useEffect } from 'react';
import AuthContextProvider, {useAuth} from "./auth/AuthenticationContext";
import AuthStack from "./auth/screens/AuthStack";
import HomeStack from "./home/screens/HomeStack";
import HandsStack, {CreateHandModal} from "./hands/screens/HandsStack";
import RoomsStack, {CreateRoomModal} from "./rooms/screens/RoomsStack";
import SettingsScreen from "./settings/screens/SettingsScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import APIContextProvider from "./shared/api/APIContext";
import ErrorContextProvider from "./shared/notification/ErrorContext";
import {ErrorNotification} from "./shared/notification/ErrorNotification";
import Icon from '@expo/vector-icons/AntDesign';
import mainTheme from "./shared/theme/mainTheme";
import ThemeContext, {useTheme} from './shared/theme/ThemeContext';
import routes from './shared/routes';
import useCustomFonts from "./shared/theme/useCustomFonts";

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const MainNavigator = ({ navigation }) => {

  const { authenticated } = useAuth();
  const theme = useTheme();
  const [fontsLoaded] = useCustomFonts();

  useEffect(() => {
    if (!authenticated && fontsLoaded) {
      navigation.navigate(routes.AUTH);
    }
  }, [authenticated, fontsLoaded]);

  if (!fontsLoaded) return <AppLoading/>;

  return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case routes.HOME.STACK:
              iconName = 'home'; break;
            case routes.HANDS.STACK:
              iconName = 'sharealt'; break;
            case routes.ROOMS.STACK:
              iconName = 'team'; break;
            case "Settings":
              iconName = 'setting'; break;

          }
          return <Icon name={iconName} color={color} size={focused ? 24 : 20}/>
        },
      })}
                     tabBarOptions={{
                       activeTintColor: theme.palette.primary.main,
                       inactiveTintColor: theme.palette.text,
                     }}
      >
        <Tab.Screen name={routes.HOME.STACK} options={{ title: "Home" }} component={HomeStack} />
        <Tab.Screen name={routes.HANDS.STACK} options={{ title: "My Hands" }} component={HandsStack}/>
        <Tab.Screen name={routes.ROOMS.STACK} options={{ title: 'Rooms' }} component={RoomsStack}/>
        {/*<Tab.Screen name="Settings" component={SettingsScreen}/>*/}

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
                <RootStack.Navigator mode="modal">
                  <RootStack.Screen name={routes.ROOT} component={MainNavigator} options={{ headerShown: false}}/>
                  <RootStack.Screen name={routes.AUTH} component={AuthStack} options={{ headerShown: false}} />
                  <RootStack.Screen name={routes.ROOMS.CREATE_STACK} component={CreateRoomModal} options={{ headerShown: false}}/>
                  <RootStack.Screen name={routes.HANDS.CREATE_STACK} component={CreateHandModal} options={{ headerShown: false}}/>

                </RootStack.Navigator>
              </NavigationContainer>
              <ErrorNotification/>
            </ErrorContextProvider>
          </AuthContextProvider>
        </APIContextProvider>
      </ThemeContext.Provider>
  );
}
