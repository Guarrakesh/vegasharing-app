import React, { useContext } from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { useTheme } from "../../shared/theme/ThemeContext";


const RoomCard = ({ room }) => {
 // const room = props.room;
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
      <TouchableOpacity title=""
                        onPress={()=>{}}
                        style={styles.touchable}>
        <View style={{flex: 1}}>
          <Text style={styles.touchableTitle}>{room.name}</Text>
          <Text style={styles.text}>{room.description}</Text>
          <Text style={styles.text}>Test</Text>
        </View>
      </TouchableOpacity>
  )
};

const makeStyles = function(theme) {
  return StyleSheet.create({
    touchable:{
      flex: 1,
      backgroundColor: theme.palette.accent.main,
      marginTop: 25,
      borderRadius: theme.card.borderRadius,
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      width: "85%",
      height: "100%",
      ...theme.elevation[8],
    },

    touchableTitle:{
      color: theme.palette.white,
      fontWeight: '600',
      fontSize: 24,
      textAlign: 'left',
    },
    text: {
      paddingVertical: 10,
      color: theme.palette.white,
    }
  });
}


export default RoomCard;

