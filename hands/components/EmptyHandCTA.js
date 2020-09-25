import Icon from "@expo/vector-icons/AntDesign";
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IconButton} from "../../shared/components/IconButton";
import Typography from "../../shared/components/Typography";
import {useTheme} from "../../shared/theme/ThemeContext";


const EmptyCardCTA = ({ onPress, title }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
      <View style={styles.root}>
        <Typography variant="caption" color="textSecondary" style={{ marginBottom: 8 }}>{title}</Typography>
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ddd'
  }
})

export default EmptyCardCTA;
