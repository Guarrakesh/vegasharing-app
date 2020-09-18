import React, { useState} from 'react';
import { SafeAreaView, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import {useAPI} from "../../shared/api/APIContext";
import Typography from "../../shared/components/Typography";
import {useErrorContext} from "../../shared/notification/ErrorContext";
import {useTheme} from "../../shared/theme/ThemeContext";
import {login} from "../api/login";
import {signup} from "../api/signup";
import {useAuth} from "../AuthenticationContext";
import routes from "../../shared/routes";
import { Svg, Path } from "react-native-svg";

const SignupScreen = ({ navigation }) => {


  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordRepeat, setPasswordRepeat] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);

  const theme = useTheme();
  const { onLoginSuccess } = useAuth();
  const { post } = useAPI();
  const { addError, removeError } = useErrorContext();
  const styles = makeStyles(theme);

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
      <SafeAreaView style={{backgroundColor: theme.backgroundColor, flex: 1, alignItems: 'flex-start', paddingTop: 150, paddingHorizontal: 16}}>
        <Svg width={'100%'} height={'100%'} viewBox="0 0 200 200" style={{ position: 'absolute', top: -100, left:0, zIndex: 0}}>
          <Path fill={theme.palette.info.main} d="M51.5,-69.2C64.2,-61.7,70.3,-43.2,70.6,-26.6C70.9,-10,65.6,4.8,62.3,21.9C59,39.1,57.9,58.6,47.9,69.6C37.8,80.6,18.9,83.2,1.4,81.2C-16.1,79.3,-32.2,72.9,-48,63.7C-63.8,54.6,-79.4,42.7,-84.9,27.2C-90.5,11.7,-86.1,-7.4,-78.9,-24.4C-71.7,-41.3,-61.6,-56.1,-48,-63.4C-34.3,-70.7,-17.2,-70.4,1.1,-72C19.4,-73.5,38.8,-76.8,51.5,-69.2Z" transform="translate(100 100)" />
        </Svg>

          <ScrollView
            style={{ flex: 1, width: '100%'}}
            contentContainerStyle={{ paddingVertical: 16, width: '100%', alignItems: 'flex-start'}}>

          <Typography variant="title" color="white">Create an account</Typography>
          <TextInput
              placeholder="Nickname"
              autoCapitalize="none"
              textContentType="nickname"
              style={styles.textInputStyle} onChangeText={setUsername}/>

          <TextInput
              autoCapitalize="none"
              placeholder="Email"

              keyboardType="email-address"
              style={styles.textInputStyle} onChangeText={setEmail}/>

          <TextInput
              placeholder="First Name"

              textContentType="name"
              style={styles.textInputStyle} onChangeText={setName}/>

          <TextInput
              placeholder="Last Name"

              textContentType="nameSuffix"
              style={styles.textInputStyle} onChangeText={setLastname}/>

          <TextInput secureTextEntry={true}
                     placeholder="Password"

                     style={styles.textInputStyle} onChangeText={setPassword}/>


          <TextInput
              placeholder="Repeat password"
              secureTextEntry={true} style={styles.textInputStyle} onChangeText={setPasswordRepeat}/>

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

const makeStyles = theme => StyleSheet.create({
  textInputStyle: {
    marginTop: 8,
    backgroundColor: theme.textInput.backgroundColor,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: theme.textInput.borderRadius,
    fontSize: theme.textInput.fontSize,
  },
  label: {
    ...theme.textInput.label,
    marginTop: 8,
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
