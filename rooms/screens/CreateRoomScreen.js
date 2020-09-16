import React, { useState } from 'react';
import {SafeAreaView, ScrollView, Text, View, TouchableOpacity, TextInput, Button} from "react-native";
import Icon from '@expo/vector-icons/AntDesign'
import UserSelect from "../../shared/components/UserSelect";
import {useTheme} from "../../shared/theme/ThemeContext";
import {useAPI} from "../../shared/api/APIContext";
import {useAuth} from "../../auth/AuthenticationContext";
import {post} from "../../shared/api/fetch";
import endpoints from "../../shared/endpoints";
import {APIError} from "../../shared/api/APIError";
import {AuthError} from "../../auth/api/signup";



const CreateRoomScreen=({navigation}) => {

  const theme = useTheme();
  const { user } = useAuth();
  const { post } = useAPI();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState({});
  const styles = makeStyles(theme);
  const addUser = (user) => {
    setSelectedUsers({...selectedUsers, [user._id]: user});
  }
  const removeUsers = (key) => {
    const newUsers = { ...selectedUsers };
    delete(newUsers[key]);
    setSelectedUsers(newUsers);
  }


  const createRoom = async () => {
      try {
          const response = await post(endpoints.ROOMS.POST, {name, description, selectedUsers, user: user.id});
          console.log(response);
      } catch(error) {
        console.log(error);
      }
  }

    console.log(name + " " + description + " " + selectedUsers);

    return (
        <SafeAreaView style={{backgroundColor: theme.palette.primary.light, flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

          <ScrollView
              style={{flex: 1, width: '80%'}}
              contentContainerStyle={{marginTop: 48}}>
              <Text style={{ color: '#EDFF00', textAlign: 'left'}}>Name</Text>
              <TextInput
                  textContentType="name"
                  style={styles.textInputStyle} onChangeText={setName}/>

              <Text style={{ color: '#EDFF00', marginTop: 16}}>Description</Text>
              <TextInput
                  textContentType="description"
                  style={styles.textInputStyle} onChangeText={setDescription}/>
              <Text style={{ color: '#EDFF00', marginTop: 16}}>Utenti</Text>
              <UserSelect
                  onSelect={addUser}
                  style={{
                    width: '100%',
                    marginTop: 8,
                    marginBottom: 24,
                  }}/>
              <View style={styles.userList}>
                {Object.keys(selectedUsers).map(key => (
                    <View style={{ marginBottom: 12}}>
                      <Text>{selectedUsers[key].username || (selectedUsers[key].name + " " + selectedUsers[key].lastname)}</Text>
                      <TouchableOpacity onPress={() => removeUsers(key)} style={styles.removeIcon}>
                        <Icon name="minuscircleo" size={16}/>
                      </TouchableOpacity>
                    </View>
                ))}
              </View>
              <TouchableOpacity title="Create room"
                                onPress={createRoom}
                                disabled={!name}
                                style={styles.buttonStyle(!name)}>
                  <Text style={{color: '#FC4710', fontSize: 16, fontWeight: '600'}}>Create Room</Text>
              </TouchableOpacity>

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
    backgroundColor: theme.backgroundColor,
    borderRadius: theme.borders.borderRadius3,
    ...theme.elevation[4],
  },
  removeIcon: {
    right: 0,
    position: 'absolute',
  },
  textInputStyle: {
    marginTop: 8,
    backgroundColor: theme.backgroundColor,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '100%',
    borderRadius: theme.borders.borderRadius3,
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
