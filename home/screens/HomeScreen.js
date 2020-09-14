import AsyncStorage from "@react-native-community/async-storage";
import {StatusBar} from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import {Button, StyleSheet, Text, View, TextInput} from "react-native";
import {useAuth} from "../../auth/AuthenticationContext";
import {fetch} from "../../shared/api/fetch";

const HomeScreen = ({ navigation }) => {

    const { user, token, authenticated} = useAuth();

  const onTokenPress = async () => {

    if (token) {
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
          <Text>Welcome to VEGA-sharing, { user ? user.name : ""}</Text>
          {authenticated ? <Button onPress={onTokenPress} title={"Premi per visualizzare la token"}/>
              : <Text>Non sei autenticato</Text>
          }

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
