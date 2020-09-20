import React, { useEffect, useState} from 'react';
import axios from 'axios';

import { createStackNavigator } from "@react-navigation/stack";
import {Text, View, ScrollView,RefreshControl } from "react-native";
import HomeScreen from "./HomeScreen";

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

const HomeStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SecondScreen" component={SecondHomeScreen}/>
      </Stack.Navigator>
  )
};

export default HomeStack;
