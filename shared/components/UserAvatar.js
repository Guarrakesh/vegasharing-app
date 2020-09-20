import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from "../theme/ThemeContext";

const UserAvatar = ({ user, size }) => {

  const theme = useTheme();
  const styles = makeStyles({size}, theme);
  if (!user || !user.name) return null;
  return (
    <View style={styles.root}>
      <Text style={styles.text} >
        {(user.name.charAt(0)).toUpperCase()}{(user.lastname ? user.lastname.charAt(0) : user.name.charAt(1)).toUpperCase() }
      </Text>
    </View>
  )
}


const makeStyles = (props, theme) => {
  const multiplier = {
    small: 0.7,
    medium: 1,
    large: 1.33
  };
  return {
    root: {
      marginRight: 5,
      width: 48 * multiplier[props.size],
      height: 48 * multiplier[props.size],
      padding: 6 * multiplier[props.size],
      borderRadius: 48 * multiplier[props.size] / 2,
      backgroundColor: theme.palette.accent.main,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 21 * multiplier[props.size],
      color: theme.palette.white,
      fontWeight: '500',
      textTransform: 'uppercase',
    }
  }
};

UserAvatar.propTypes = {
  size: PropTypes.oneOf(['small','medium','large'])
}
export default UserAvatar;
