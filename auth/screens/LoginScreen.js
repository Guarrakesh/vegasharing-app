import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native';
import {login} from "../api/login";

const LoginScreen = () => {


  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const submit = async () => { 
    // fai le tue cose di login
    const response = await login(username, password);
  }

  return (
      <SafeAreaView style={{backgroundColor: '#FC4710', flex: 1, justifyContent: 'center', alignItems: 'center'}}>

        <View style={{height: "50%", width: '60%', alignItems: 'center'}}>
          <Image style={{ width: 80, height: 80 }} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"}}/>
          <Text style={{ color: '#fff'}}>Username</Text>
          <TextInput style={styles.textInputStyle} onChangeText={setUsername}/>
          <Text style={{color: '#fff', marginTop: 16}}>Password</Text>
          <TextInput secureTextEntry={true} style={styles.textInputStyle} onChangeText={setPassword}/>

          <TouchableOpacity title="Login"
                            onPress={submit}
                            style={{
                              marginTop: 24,
                              backgroundColor: "#EAFF00",
                              paddingVertical: 8,
                              borderRadius: 25,
                              width: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingHorizontal: 16
                            }}>
            <Text style={{color: '#FC4710',}}>Accedi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    marginTop: 8,
    backgroundColor: "rgba(255,255,255, 0.4)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: 12
  }
})
export default LoginScreen;
