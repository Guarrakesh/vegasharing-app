import Icon from "@expo/vector-icons/AntDesign";
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from "react-native-web";
import {IconButton} from "../../shared/components/IconButton";
import {useTheme} from "../../shared/theme/ThemeContext";


const EmptyCardCTA = ({ onPress }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
      <View style={styles.root}>
        <IconButton icon={<Icon name="plus"/>} onPress={onPress} />
      </View>
  )
}

const makeStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    padding: 32,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#ddd'
  }
})
