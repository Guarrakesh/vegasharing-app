import React, { useEffect} from "react";
import {Animated, Dimensions, SafeAreaView, Text} from "react-native";
import {useTheme} from "../theme/ThemeContext";
import {useErrorContext} from "./ErrorContext";
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

export const ErrorNotification = () => {
  const { error, removeError } = useErrorContext();
  const theme = useTheme();

  const translationY = new Animated.Value(0);

  useEffect(() => {
    let timeout;
    if (error && error.message) {
      timeout = setTimeout(() => {
        Animated.timing(translationY, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(removeError);

      },5000);
      Animated.timing(translationY, {
        toValue: Dimensions.get('screen').height / 8,
        duration: 100,
        useNativeDriver: true,

      }).start()
    }
    return () => clearTimeout(timeout);
  }, [error]);

  const styles = makeStyles(theme);
  return error &&
      <AnimatedSafeAreaView
          style={[
            styles.root,
            { transform: [ { translateY: translationY } ]}
          ]}>
        <Text style={styles.text}>{error.message.toString()}</Text>
      </AnimatedSafeAreaView>
      ;
}

const makeStyles = (theme) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.error.main,
    position: 'absolute',
    top:  -Dimensions.get('screen').height / 8,
    width: '100%',
    height: Dimensions.get('screen').height / 8,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  text: {
    fontSize: 16,
    color: theme.palette.white
  }
});
