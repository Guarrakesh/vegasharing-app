
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from "react-native";
import {useAuth} from "../../auth/AuthenticationContext";
import Typography from "../../shared/components/Typography";
import UserAvatar from "../../shared/components/UserAvatar";
import {useTheme} from "../../shared/theme/ThemeContext";

const HomeScreen = ({ navigation }) => {

  const { user, token, authenticated, logout} = useAuth();
  const theme = useTheme();
  const styles = makeStyles(theme);
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

  const doLogout = () => {
    logout();
  }
  return (
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <UserAvatar user={user} size="small"/>
            <Typography variant="subtitle" color={"text"}>
              <Text>Welcome back, { user ? user.name : ""}</Text>
            </Typography>
            <TouchableOpacity style={styles.exit} onPress={doLogout}>
              <Typography variant="caption">
                Logout
              </Typography>
            </TouchableOpacity>
          </View>

          <View style={styles.hands}>
            <Typography variant="body">
              Your latest hands

            </Typography>
          </View>
          <View style={styles.rooms}>
            <Typography variant="body">
              Your active rooms

            </Typography>
          </View>
        </View>
      </SafeAreaView>

  )
};


const makeStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.backgroundColor,

  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: theme.backgroundColor,
  },
  welcome: {
    backgroundColor: theme.palette.info.light,
    width: 300,
    height: 140,
    borderRadius: 12,
    padding: 12
  },
  hands: {
    marginBottom: 32,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  exit: {
    position: 'absolute',
    right: 0,

  }
});


export default HomeScreen;
