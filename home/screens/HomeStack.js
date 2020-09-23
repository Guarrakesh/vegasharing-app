import {BlurView} from "expo-blur";
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import RoomDetailScreen from "../../rooms/screens/RoomDetailScreen";
import routes from '../../shared/routes';

import {createStackNavigator, useHeaderHeight} from "@react-navigation/stack";
import {Text, View, ScrollView, RefreshControl, StyleSheet} from "react-native";
import {useTheme} from "../../shared/theme/ThemeContext";
import HomeScreen from "./HomeScreen";
import Icon from '@expo/vector-icons/AntDesign'

const Stack = createStackNavigator();


const postsURL = "https://my-json-server.typicode.com/typicode/demo/posts";
const SecondHomeScreen = ({ navigation, route }) => {

  const { params } = route;
  const { id } = params;

  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    console.log("effettuo richiesta...");
    const response = await axios.get(postsURL + "/" + id );
    setPost(response.data);
  };

  useEffect( () => {
    fetchPost();
  }, []);

  return (
      <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={fetchPost}/>
          }
      >
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text>Post title: { post ? post.title : ""} </Text>
        </View>
      </ScrollView>
  )
}

const withMarginTop = (Screen) => {
  const height = useHeaderHeight();
  return (props) => React.createElement(Screen, { ...props, style: { marginTop: 120}})
}


const HomeStack = () => {
  const theme = useTheme();

  return (
      <Stack.Navigator  screenOptions={{
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
        headerRight: null,
        headerRightContainerStyle: { position: 'absolute', top: -35,right: 8 }

      }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={routes.HOME.ROOM_DETAIL} component={withMarginTop(RoomDetailScreen)}/>
        {/*<Stack.Screen name={routes.HOME.HAND_DETAIL} component={null}/>*/}
      </Stack.Navigator>
  )
};

export default HomeStack;
