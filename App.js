import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {request} from './shared/api/request';
import AsyncStorage  from '@react-native-community/async-storage';

export default function App() {

  const onPress = async () => {
    console.log("Sto inviando la richiesta");
    try {
      const response = await request('/authentication/login', 'POST', {
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
  }

  const onTokenPress = async () => {
    let token = await AsyncStorage.getItem('USER_TOKEN');
    if (token) {
      token = JSON.parse(token);
      alert(token.accessToken);
    } else {
      alert("La token non esiste, prova a loggarti prima");
    }
  }
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#fefdaa', width: 300, height: 140, borderRadius: 12, padding: 12}}>
      <Text>Welcome to VEGA-sharing</Text>
      <Button onPress={onPress} title={"Premi per autenticarti"} />
      <Button onPress={onTokenPress} title={"Premi per visualizzare la token"}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
