import React, { useState} from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native';
import {useAPI} from "../../shared/api/APIContext";
import {useErrorContext} from "../../shared/notification/ErrorContext";
import {login} from "../api/login";
import {useAuth} from "../AuthenticationContext";
import routes from "../../shared/routes";

const LoginScreen = ({ navigation }) => {


  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { onLoginSuccess } = useAuth();
  const { post } = useAPI();
  const { addError, error } = useErrorContext();
  const submit = async () => { 
    // fai le tue cose di login
    try {
      const response = await login(username, password);
      onLoginSuccess(response.data.user, response.data.token);
      navigation.navigate(routes.HOME_SCREEN);
    } catch (ex) {
      if (ex.response.status >= 400 && ex.response.status <= 499) {
        addError(`Login non riuscito, credenziali errate`);
      } else {
        addError(`Non è stato possibile autenticarti: ${ex.message} (${ex.status})`, ex.status)
      }
    }
  }

  return (
      <SafeAreaView style={{backgroundColor: '#FC4710', flex: 1, justifyContent: 'center', alignItems: 'center'}}>

        <View style={{height: "50%", width: '80%', alignItems: 'flex-start' }}>
          <Image style={{ width: 80, height: 80, alignSelf: 'center', marginBottom: 12}} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"}}/>
          <Text style={{ color: '#fff'}}>Username</Text>
          <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="username"
              style={styles.textInputStyle} onChangeText={setUsername}/>
          <Text style={{color: '#fff', marginTop: 16}}>Password</Text>
          <TextInput secureTextEntry={true} style={styles.textInputStyle} onChangeText={setPassword}/>

          <TouchableOpacity title="Login"
                            onPress={submit}
                            disabled={!username || !password}

                            style={styles.buttonStyle(!username || !password)}>
            <Text style={{color: '#FC4710', fontSize: 16, fontWeight: '600'}}>Accedi</Text>
          </TouchableOpacity>

          <TouchableOpacity
              title={"Sign up"}
              onPress={() => navigation.navigate(routes.SIGNUP_SCREEN)}
              style={{ marginTop: 32, flex: 1, alignSelf: 'center', width: '100%', textAlign: 'center'}}
              >
          <Text style={styles.signup} textDecorationLine="underline">Sign up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    marginTop: 8,
    backgroundColor: "rgba(255,255,255, 0.4)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: 4,
  },
  buttonStyle: (disabled) => ({
    marginTop: 24,
    backgroundColor: disabled ? "rgba(210,210,210,0.36)":  "#EAFF00",
    paddingVertical: 12,
    borderRadius: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
  }),
  signup: {
    textAlign: 'center',
    textDecorationLine: "underline"
  }
})
export default LoginScreen;
