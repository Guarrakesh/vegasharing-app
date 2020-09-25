import {createStackNavigator} from "@react-navigation/stack";
import React from 'react';
import CreateRoomScreen from "../../rooms/screens/CreateRoomScreen";
import routes from "../../shared/routes";
import CreateHandScreen from "./CreateHandScreen";
import HandsScreen from "./HandsScreen";

const Stack = createStackNavigator();

const ModalStack = createStackNavigator();


export const CreateHandModal = () => {
  return (
      <ModalStack.Navigator>
        <Stack.Screen name={routes.HANDS.CREATE_HAND_SCREEN}
                      options={{title: "Create an Hand", }}
                      component={CreateHandScreen}/>

      </ModalStack.Navigator>
  );
}

const HandsStack = () => {
    return (
        <Stack.Navigator mode="modal">
            <Stack.Screen name={routes.HANDS.MYHANDS} component={HandsScreen}/>
            {/*  <Stack.Screen name="Signup" component={SecondHomeScreen}/>*/}
        </Stack.Navigator>
    )
};

export default HandsStack;
