import React, { useState} from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import {useAPI} from "../../shared/api/APIContext";
import Typography from "../../shared/components/Typography";
import {useErrorContext} from "../../shared/notification/ErrorContext";
import {useTheme} from "../../shared/theme/ThemeContext";
import {login} from "../api/login";
import {useAuth} from "../AuthenticationContext";
import routes from "../../shared/routes";
import Icon from '@expo/vector-icons/AntDesign'

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
      <SafeAreaView style={{backgroundColor: theme.palette.primary.main, flex: 1}}>
        <View style={{ flex: 0.4,backgroundColor: theme.backgroundColor, borderBottomRightRadius: 75, paddingVertical: 50, paddingHorizontal: 32} }>

          {/*<SafeAreaView style={styles.header}>

        </SafeAreaView>*/}
          <ScrollView
              contentContainerStyle={{paddingTop: 42, backgroundColor: theme.backgroundColor, flex: 3, flexBasis: "70%", width: '100%', alignItems: 'flex-start' }}>

            <Text style={{ color: theme.palette.text}}>Username</Text>
            <TextInput
                placeholder="Username"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="username"
                style={styles.textInputStyle} onChangeText={setUsername}/>
            <Text style={{color:  theme.palette.text, marginTop: 16}}>Password</Text>
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.textInputStyle} onChangeText={setPassword}/>


          </ScrollView>
        </View>
        <View style={{ flex: 0.7}}>
          <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: theme.backgroundColor}}/>
          <View style={{ paddingTop: 38, justifyContent: 'flex-start', alignItems: 'center', flex: 1, backgroundColor: theme.palette.primary.main, borderTopLeftRadius: 75,}}>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: "center"}}>
              <Typography variant="title" color="white" style={{ marginRight: 32, }}>Sign in</Typography>
              <TouchableOpacity title="Login"
                                onPress={submit}
                                disabled={!username || !password}

                                style={styles.buttonStyle(!username || !password)}>
                <Icon color={theme.palette.primary.main} name="arrowright" size={24}/>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
                title={"No account yet? Sign up"}
                onPress={() => navigation.navigate(routes.SIGNUP_SCREEN)}
                style={{ alignSelf: 'flex-start', width: '100%', textAlign: 'left', width: '100%'}}
            >
              <Text style={styles.signup} textDecorationLine="underline">No account yet? Sign up</Text>
            </TouchableOpacity>
            <Image style={{ alignSelf: 'center', position: 'absolute', bottom: 0, marginBottom: 12}} source={Logo}/>

          </View>
        </View>
      </SafeAreaView>
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
    backgroundColor: disabled ? "rgba(210,210,210,0.36)": '#fff',

    borderRadius: 100,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
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
