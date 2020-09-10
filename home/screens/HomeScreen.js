import AsyncStorage from "@react-native-community/async-storage";
import {StatusBar} from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import {Button, StyleSheet, Text, View, TextInput} from "react-native";
import {fetch} from "../../shared/api/fetch";

const HomeScreen = ({ navigation }) => {

  const onPress = async () => {
    try {
      const response = await fetch('/authentication/login', 'POST', {
        data: {
          email: "dario.guarracino2@gmail.com",
          password: "sabcde123"
        }
      });
      const token = response.data.token;
      const user = response.data.user;
      AsyncStorage.setItem('USER_TOKEN', JSON.stringify(token)); // serializzo la token e la salvo nello storage
      AsyncStorage.setItem('USER', JSON.stringify(user));


    } catch (ex) {
      console.log(ex.message);
    }
  };

  const onTokenPress = async () => {
    let token = await AsyncStorage.getItem('USER_TOKEN');
    if (token) {
      token = JSON.parse(token);
      alert(token.accessToken);
    } else {
      alert("La token non esiste, prova a loggarti prima");
    }
  };

  const [text, setText] = useState(null);

  const colors = ['red','brown','white','green','gray','purple','grey'];

  const [backgroundColor, setBackgroundColor] = useState("#fff");

  // background color - cambia colore della striscia ogni volta che cambio testo
  useEffect(() => {
    setBackgroundColor(colors[Math.floor(Math.random() * (colors.length-1))])
  }, [text]);

  return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#fefdaa', width: 300, height: 140, borderRadius: 12, padding: 12}}>
          <View style={{ height: 10, width: '100%', backgroundColor: backgroundColor }}></View>
          <Text>Welcome to VEGA-sharing</Text>
          <Button onPress={onPress} title={"Premi per autenticarti"} />
          <Button onPress={onTokenPress} title={"Premi per visualizzare la token"}/>

          <TextInput style={{ backgroundColor: '#fff', padding: 12 }} onChangeText={setText} value={text}/>
          <Button title="Vai al post" onPress={() => {
            navigation.navigate('SecondScreen', { id: text });
          }}/>

          <Button onPress={() => navigation.navigate('AuthStack')} title="Accedi" />
        </View>
        <StatusBar style="auto" />
      </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default HomeScreen;
