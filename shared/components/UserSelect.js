import React, { useState, useEffect } from 'react';
import { TextInput, Text, StyleSheet, ScrollView, View, TouchableHighlight, TouchableOpacity} from "react-native";
import {useAPI} from "../api/APIContext";
import {useTheme} from "../theme/ThemeContext";
import Icon from '@expo/vector-icons/AntDesign';
import endpoints from '../endpoints';
import { debounce } from 'lodash';


const UserItem = ({ user, onPress }) => {
  const theme = useTheme();
  const styles = makeUserItemStyles(theme);
  return (
      <TouchableHighlight
          onPress={() => onPress(user)}
          activeOpacity={0.9}
          underlayColor={theme.palette.accent.light}
          style={styles.touchable}>
        <Text >{user.username || (user.name + " " + user.lastname) }</Text>
      </TouchableHighlight>
  )
}

const makeUserItemStyles = theme => StyleSheet.create({
  touchable: {
    width: '100%',
    paddingVertical: 12,
    borderBottomColor: theme.borders.color,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  text: {
    color: theme.palette.text,

  }
})
const UserSelect = ({ style, textInputStyle, onSelect }) => {

  const theme = useTheme();
  const { get } = useAPI();

  const [dirty, setDirty] = useState(false);
  const [results, setResults] = useState([]);
  const fetchUsers = async (searchQuery) => {
    try {
      const response = await get(endpoints.USERS.GET_MANY, {q: searchQuery});
      setResults(response.data);
    } catch (ex) {
      console.log(ex);
    }
  }

  const handleChangeText = debounce((text) => {
    if (text == "") {
      setResults([]);
      setDirty(false);
    } else {
      fetchUsers(text);
      setDirty(true);
    }
  }, 500);

  const styles = makeStyles(theme);

  const handleSelect = (user) => {
    onSelect(user);
  }
  return (
      <>
        <View style={[styles.root, style]}>
          <TextInput
              placeholder="Type to search users..."
              onChangeText={handleChangeText} style={[styles.textInput, textInputStyle]}/>
          <TouchableOpacity style={styles.addIcon}>
            <Icon name={"pluscircleo"} size={18}/>
          </TouchableOpacity>
          {dirty && <ScrollView style={[style, styles.resultsView]}>
            <Text style={{ paddingLeft: 16  , fontSize: 10, marginBottom: 12, fontWeight: "600", color: '#494949'}}>
              {  results.length > 0 ? "RESULTS" : "No Results found" }
            </Text>

            {results.map((result, idx)=> (
                            <UserItem key={idx} user={result} onPress={handleSelect}/>
                        ))}

            </ScrollView>}
        </View>

      </>
  )

};

const makeStyles = (theme) => StyleSheet.create({
  root: {

    borderRadius: theme.borders.borderRadius3,
    backgroundColor: theme.backgroundColor,
    ...theme.elevation[4],
  },
  textInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16
  },
  addIcon: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  resultsView: {
    width: '100%',
    backgroundColor: theme.backgroundColor,
    marginTop: 24,

  }
})
export default UserSelect;
