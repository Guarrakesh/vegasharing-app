import React, { useState} from 'react';
import { SafeAreaView, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native';
import {useAPI} from "../../shared/api/APIContext";
import {useErrorContext} from "../../shared/notification/ErrorContext";
import {login} from "../api/login";
import {signup} from "../api/signup";
import {useAuth} from "../AuthenticationContext";
import routes from "../../shared/routes";

const SignupScreen = ({ navigation }) => {


  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordRepeat, setPasswordRepeat] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);

  const { onLoginSuccess } = useAuth();
  const { post } = useAPI();
  const { addError, removeError } = useErrorContext();
  const submit = async () => { 
    // fai le tue cose di login
    removeError();
    try {
      // validation
      if (password !== passwordRepeat) {
        addError("Le due password non corrispondono");
        return;
      }
      const response = await signup({ username, password, email, name, lastname});
      onLoginSuccess(response.data.user, response.data.token);
      navigation.navigate(routes.HOME_SCREEN);

    } catch (ex) {
      if (ex.response && ex.response.status >= 400 && ex.response.status <= 499) {
        if (Array.isArray(ex.response.data.message)) {
          addError(`Signup non riuscito: ${ex.response.data.message[0]}`);
        } else {
          addError("Signup non riuscito");
        }
      } else {
        addError(`Non è stato possibile registrarti: ${ex.message} (${ex.status})`, ex.status)
      }
    }
  }


  return (
      <SafeAreaView style={{backgroundColor: '#FC4710', flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

        <ScrollView
            style={{ flex: 1, width: '80%'}}
            contentContainerStyle={{height: "50%", width: '100%', alignItems: 'flex-start', marginTop: 48 }}>
          <Text style={{ color: '#fff'}}>Username</Text>
          <TextInput
              autoCapitalize="none"
              textContentType="nickname"
              style={styles.textInputStyle} onChangeText={setUsername}/>

          <Text style={{ color: '#fff', marginTop: 16}}>Email</Text>
          <TextInput
              autoCapitalize="none"

              keyboardType="email-address"
              style={styles.textInputStyle} onChangeText={setEmail}/>

          <Text style={{ color: '#fff', marginTop: 16, }}>First Name</Text>
          <TextInput
              textContentType="name"
              style={styles.textInputStyle} onChangeText={setName}/>

          <Text style={{ color: '#fff' ,marginTop: 16, }}>Last Name</Text>
          <TextInput
              textContentType="nameSuffix"
              style={styles.textInputStyle} onChangeText={setLastname}/>

          <Text style={{color: '#fff', marginTop: 16}}>Password</Text>
          <TextInput secureTextEntry={true} style={styles.textInputStyle} onChangeText={setPassword}/>


          <Text style={{color: '#fff', marginTop: 16}}>Ripeti password</Text>
          <TextInput secureTextEntry={true} style={styles.textInputStyle} onChangeText={setPasswordRepeat}/>

          <TouchableOpacity title="Login"
                            onPress={submit}
                            disabled={!username || !password || !email || !passwordRepeat}

                            style={styles.buttonStyle(!username || !password)}>
            <Text style={{color: '#FC4710', fontSize: 16, fontWeight: '600'}}>Accedi</Text>
          </TouchableOpacity>
        </ScrollView>
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
  })
})
export default SignupScreen;
