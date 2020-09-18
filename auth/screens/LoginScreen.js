import React, { useState} from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native';
import {useAPI} from "../../shared/api/APIContext";
import {useErrorContext} from "../../shared/notification/ErrorContext";
import {useTheme} from "../../shared/theme/ThemeContext";
import {login} from "../api/login";
import {useAuth} from "../AuthenticationContext";
import routes from "../../shared/routes";

import Logo from '../../assets/logo/logo.png';

const LoginScreen = ({ navigation }) => {


  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { onLoginSuccess } = useAuth();
  const { post } = useAPI();
  const { addError, error } = useErrorContext();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const submit = async () => {
    // fai le tue cose di login
    try {
      const response = await login(username, password);
      onLoginSuccess(response.data.user, response.data.token);
      navigation.navigate(routes.HOME_SCREEN);
    } catch (ex) {
      if (ex.response && ex.response.status >= 400 && ex.response.status <= 499) {
        addError(`Login non riuscito, credenziali errate`);
      } else {
        addError(`Non è stato possibile autenticarti: ${ex.message} (${ex.status})`, ex.status)
      }
    }
  }

  return (
      <View style={{backgroundColor: theme.backgroundColor, flex: 1,  alignItems: 'center'}}>

        <SafeAreaView style={styles.header}>
          <Image style={{ alignSelf: 'center', marginBottom: 12}} source={Logo}/>

        </SafeAreaView>
        <View style={{paddingTop: 42, backgroundColor: theme.backgroundColor, flex: 3, flexBasis: "70%", width: '100%', alignItems: 'center' }}>

          <View style={{ width: '80%', flex: 1, justifyContent: 'center'}}>
            <Text style={{ color: theme.palette.text}}>Username</Text>
            <TextInput
                placeholder="Username"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="username"
                style={styles.textInputStyle} onChangeText={setUsername}/>
            <Text style={{color:  theme.palette.text, marginTop: 16}}>Password</Text>
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.textInputStyle} onChangeText={setPassword}/>

            <TouchableOpacity title="Login"
                              onPress={submit}
                              disabled={!username || !password}

                              style={styles.buttonStyle(!username || !password)}>
              <Text style={{color: theme.palette.white, fontSize: 16, fontWeight: '600'}}>Accedi</Text>
            </TouchableOpacity>

            <TouchableOpacity
                title={"Sign up"}
                onPress={() => navigation.navigate(routes.SIGNUP_SCREEN)}
                style={{ marginTop: 32, flex: 1, alignSelf: 'center', width: '100%', textAlign: 'center'}}
            >
              <Text style={styles.signup} textDecorationLine="underline">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  )
}

const makeStyles = theme => StyleSheet.create({
  textInputStyle: {
    marginTop: 8,
    backgroundColor: theme.textInput.backgroundColor,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: 4,
  },
  buttonStyle: (disabled) => ({
    marginTop: 24,
    backgroundColor: disabled ? "rgba(210,210,210,0.36)":  theme.palette.primary.main,
    paddingVertical: 12,
    borderRadius: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.white,
    paddingHorizontal: 16
  }),
  header: {
    backgroundColor: theme.palette.primary.main,
    width: '100%', flexBasis: '30%', justifyContent: 'center',
    borderBottomLeftRadius: 50, borderBottomRightRadius: 50,
    ...theme.elevation[8],

  },
  signup: {
    textAlign: 'center',
    textDecorationLine: "underline",

  }
})
export default LoginScreen;
