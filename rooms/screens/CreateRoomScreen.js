import React, { useState } from 'react';
import {SafeAreaView, ScrollView, Text, View, TouchableOpacity, TextInput, Button} from "react-native";
import Icon from '@expo/vector-icons/AntDesign'
import UserAvatar from "../../shared/components/UserAvatar";
import UserSelect from "../../shared/components/UserSelect";
import {useErrorContext} from "../../shared/notification/ErrorContext";
import {useTheme} from "../../shared/theme/ThemeContext";
import {useAPI} from "../../shared/api/APIContext";
import {useAuth} from "../../auth/AuthenticationContext";
import {post} from "../../shared/api/fetch";
import endpoints from "../../shared/endpoints";
import {APIError} from "../../shared/api/APIError";
import {AuthError} from "../../auth/api/signup";
import routes from '../../shared/routes';


const CreateRoomScreen=({navigation, style}) => {

  const theme = useTheme();
  const { user } = useAuth();
  const { post } = useAPI();
  const { addError, removeError } = useErrorContext();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState({});
  const styles = makeStyles(theme);
  const addUser = (addedUser) => {
    if (addedUser._id === user.id) return;
    setSelectedUsers({...selectedUsers, [addedUser._id]: addedUser});
  }
  const removeUsers = (key) => {
    const newUsers = { ...selectedUsers };
    delete(newUsers[key]);
    setSelectedUsers(newUsers);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
          <Button onPress={createRoom} title="Done" disabled={!name || Object.keys(selectedUsers).length === 0}/>
      )
    })
  });
  const createRoom = async () => {
      try {
        removeError();
        const userIds = Object.keys(selectedUsers);
        if (!name || userIds.length === 0) {
          addError("Please fill the name and the room users fields");
          return;
        }
          await post(endpoints.ROOMS.POST, {
            name,
            description,
            userIds,
            creatorId: user.id
          });
          navigation.goBack();
      } catch(error) {
        if (error.response && error.response.data) {
          addError(error.response.data);
        } else {
          addError(error.message ?? error);
        }
      }
  }

    return (
        <SafeAreaView style={[{backgroundColor: theme.backgroundColor, flex: 1, justifyContent: 'flex-start', alignItems: 'center'}, style]}>

          <ScrollView
              style={{flex: 1, width: '80%'}}
              contentContainerStyle={{marginTop: 48}}>
            <Text style={{ color: theme.palette.primary.main, fontSize: 34, fontWeight: '700', marginBottom: 24 }}>Create a room</Text>
              <Text style={theme.textInput.label}>Name</Text>
              <TextInput
                  placeholder="Type the name of the room"
                  textContentType="name"
                  style={styles.textInputStyle} onChangeText={setName}/>

              <Text style={theme.textInput.label}>Description</Text>
              <TextInput
                  placeholder="Write a description"
                  textContentType="description"
                  style={styles.textInputStyle} onChangeText={setDescription}/>
              <Text style={theme.textInput.label}>Utenti</Text>
              <UserSelect
                  onSelect={addUser}
                  style={{
                    width: '100%',
                    marginTop: 8,
                    marginBottom: 24,
                  }}/>
              <View style={styles.userList}>
                {Object.keys(selectedUsers).map(key => (
                    <View style={{ marginBottom: 12, flexDirection: 'row', alignItems: 'center'}}>
                      <UserAvatar user={selectedUsers[key]} size={"small"}/>
                      <Text>{selectedUsers[key].username || (selectedUsers[key].name + " " + selectedUsers[key].lastname)}</Text>
                      <TouchableOpacity onPress={() => removeUsers(key)} style={styles.removeIcon}>
                        <Icon name="minuscircleo" size={16}/>
                      </TouchableOpacity>
                    </View>
                ))}
              </View>


            </ScrollView>

        </SafeAreaView>

    )
}

const makeStyles = theme => ({
  userList: {
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: theme.textInput.backgroundColor,
    borderRadius: theme.textInput.borderRadius,
    ...theme.elevation[4],
  },
  removeIcon: {
    right: 0,
    position: 'absolute',
  },
  textInputStyle: {
    backgroundColor: theme.textInput.backgroundColor,
    marginBottom: theme.textInput.marginBottom,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: '100%',
  },
   buttonStyle: (disabled) => ({
        marginTop: 24,
        backgroundColor: disabled ? "rgba(210,210,210,0.36)":  "#EAFF00",
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16
    }),
})
export default CreateRoomScreen;
