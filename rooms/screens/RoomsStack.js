import {createStackNavigator} from "@react-navigation/stack";
import React from 'react';
import {Button, TouchableOpacity} from "react-native";
import RoomsScreen from "./RoomsScreen"
import CreateRoomScreen from "./CreateRoomScreen"
import RoomDetailsScreen from "./RoomDetailScreen"
import Icon from '@expo/vector-icons/AntDesign'
import { MaterialIcons } from '@expo/vector-icons';
const Stack = createStackNavigator();

const RoomsStack = ({navigation}) => {
    return (
        <Stack.Navigator mode="modal">
            <Stack.Screen name="Rooms" component={RoomsScreen}
                          options={
                              {
                                  headerRight: ()=>
                                      <TouchableOpacity style={{ marginRight: 16 }} onPress={() => navigation.navigate('Create Room')}>
                                        <Icon name="plus" size={18}/>
                                      </TouchableOpacity>
                              }
                          }
            />
            <Stack.Screen name="Create Room" component ={CreateRoomScreen} mode="modal"/>
            <Stack.Screen name={"Details Room"} component={RoomDetailsScreen}/>
            {/*  <Stack.Screen name="Signup" component={SecondHomeScreen}/>*/}
        </Stack.Navigator>
    )
};

export default RoomsStack;
