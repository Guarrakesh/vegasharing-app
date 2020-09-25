import React, { useState, useEffect} from 'react';
import { ActivityIndicator, SafeAreaView, TouchableWithoutFeedback, Platform, Text, Keyboard, StyleSheet, TextInput, TouchableOpacity, View, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
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
  const [isLoading, setIsLoading] = useState(false);
  const { onLoginSuccess } = useAuth();
  const { post } = useAPI();
  const { addError, error } = useErrorContext();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const submit = async () => {
    // fai le tue cose di login
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await login(username, password);
      onLoginSuccess(response.data.user, response.data.token);
      navigation.navigate(routes.HOME_SCREEN);
    } catch (ex) {
      if (ex.response && ex.response.status >= 400 && ex.response.status <= 499) {
        addError(`Login non riuscito, credenziali errate`);
      } else {
        addError(`Non è stato possibile autenticarti: ${ex.message} (${ex.status})`, ex.status)
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Move to separated hook
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardOpen(true); // or some other action
        }
    );
    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardOpen(false); // or some other action
        }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
      <SafeAreaView style={{backgroundColor: theme.palette.primary.main, flex: 1}}>
        <View
            style={{ flex:keyboardOpen ? Platform.OS === "android" ? 1 : 0.4 : 0.4,backgroundColor: theme.backgroundColor, borderBottomRightRadius: 75, paddingVertical: 50, paddingHorizontal: 32} }
        >

        {/*<SafeAreaView style={styles.header}>

        </SafeAreaView>*/}
          <ScrollView
              contentContainerStyle={{paddingTop: 42, backgroundColor: theme.backgroundColor, flex: 3, flexBasis: "70%", width: '100%', alignItems: 'flex-start' }}>

            <Typography variant="body"  style={{ marginTop: 8 }}>Email</Typography>
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="username"
                style={styles.textInputStyle} onChangeText={setUsername}/>
            <Typography variant="body" color="text" style={{ marginTop: 8 }}>Password</Typography>
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.textInputStyle} onChangeText={setPassword}/>


          </ScrollView>
        </View>
        <View
            style={{ flex: keyboardOpen ? Platform.OS === "android" ? 0 : 0.7 : 0.7, opacity: keyboardOpen ? 0 : 1}}>
          <View style={{ paddingTop: 38, justifyContent: 'flex-start', alignItems: 'center', flex: 1, backgroundColor: theme.palette.primary.main, borderTopLeftRadius: 75,}}>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: "center"}}>
              <Typography variant="title" color="white" style={{ marginRight: 32, }}>Sign in</Typography>
              <TouchableOpacity title="Login"
                                onPress={submit}
                                disabled={!username || !password}

                                style={styles.buttonStyle(!username || !password)}>
                {isLoading ? <ActivityIndicator/> : <Icon color={theme.palette.primary.main} name="arrowright" size={24}/>}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
                title={"No account yet? Sign up"}
                onPress={() => navigation.navigate(routes.SIGNUP_SCREEN)}
                style={{ alignSelf: 'flex-start',textAlign: 'left', marginTop: 64, width: '100%'}}
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
