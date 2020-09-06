import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const SettingsScreen = () => {

  return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#ff5d69', width: 300, height: 140, borderRadius: 12, padding: 12}}>
          <Text>Settings</Text>

        </View>
      </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default SettingsScreen;
