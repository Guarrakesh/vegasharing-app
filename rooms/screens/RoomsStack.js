import {createStackNavigator} from "@react-navigation/stack";
import React from 'react';
import {Button} from "react-native";
import RoomsScreen from "./RoomsScreen"
import CreateRoomScreen from "./CreateRoomScreen"
import RoomDetailsScreen from "./RoomDetailScreen"
const Stack = createStackNavigator();


const RoomsStack = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Rooms" component={RoomsScreen}
                          options={
                              {
                                  headerRight: ()=> <Button onPress={() => navigation.navigate('Create Room')} title="+"/>
                              }
                          }
            />
            <Stack.Screen name="Create Room" component ={CreateRoomScreen}/>
            <Stack.Screen name={"Details Room"} component={RoomDetailsScreen}/>
            {/*  <Stack.Screen name="Signup" component={SecondHomeScreen}/>*/}
        </Stack.Navigator>
    )
};

export default RoomsStack;
