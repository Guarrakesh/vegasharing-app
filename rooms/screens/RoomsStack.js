import {createStackNavigator, useHeaderHeight} from "@react-navigation/stack";
import React from 'react';
import {TouchableOpacity, StyleSheet} from "react-native";
import {useTheme} from "../../shared/theme/ThemeContext";
import RoomsScreen from "./RoomsScreen"
import CreateRoomScreen from "./CreateRoomScreen"
import RoomDetailsScreen from "./RoomDetailScreen"
import Icon from '@expo/vector-icons/AntDesign'
const Stack = createStackNavigator();
import { BlurView } from 'expo-blur';
import CreateHandScreen from "../../hands/screens/CreateHandScreen";


const withMarginTop = (Screen) => {
  const height = useHeaderHeight();
  return (props) => React.createElement(Screen, { ...props, style: { marginTop: 120}})


}
const RoomsStack = ({navigation}) => {
  const theme = useTheme();
    return (
        <Stack.Navigator mode="modal" screenOptions={{
          headerTitleAlign: 'left',
          headerStyle: { height: 120,borderBottomRightRadius: 24, borderBottomLeftRadius: 24},
          headerTransparent: true,
          headerBackground: () => <BlurView tint={theme.mode} intensity={100} style={[StyleSheet.absoluteFill]} />,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: 21,
            color: theme.palette.text,
          },
          headerBackImage: ({ tintColor} ) => <Icon name="arrowleft" style={{ color: tintColor}} size={21}/>,
          headerTitleContainerStyle: { bottom: 8, left: 16 },
          headerTintColor: theme.palette.text,
          headerLeftContainerStyle: { position: 'absolute', top: -35,left: 16 },
          headerRightContainerStyle: { position: 'absolute', top: -35,right: 8 }

        }}>
            <Stack.Screen name="Rooms" component={withMarginTop(RoomsScreen)}
                          options={
                              {
                                headerRight: ()=>
                                      <TouchableOpacity style={{ marginRight: 16 }} onPress={() => navigation.navigate('Create Room')}>
                                        <Icon name="plus" size={18}/>
                                      </TouchableOpacity>
                              }
                          }
            />
            <Stack.Screen name="Create Room" component ={withMarginTop(CreateRoomScreen)} mode="modal"/>
            <Stack.Screen name="Details Room" component={withMarginTop(RoomDetailsScreen)}/>
            <Stack.Screen name="Create Hand" component={CreateHandScreen}/>
            {/*  <Stack.Screen name="Signup" component={SecondHomeScreen}/>*/}
        </Stack.Navigator>
    )
};

export default RoomsStack;
