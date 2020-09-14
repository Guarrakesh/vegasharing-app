import React, { useState } from 'react';
import {SafeAreaView, ScrollView, Text, View, TouchableOpacity} from "react-native";
import Icon from '@expo/vector-icons/AntDesign'
import UserSelect from "../../shared/components/UserSelect";
import {useTheme} from "../../shared/theme/ThemeContext";




const CreateRoomScreen=({navigation}) => {

  const theme = useTheme();
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
    return (
        <SafeAreaView>
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <Text>Crea stanza</Text>

                <UserSelect
                    onSelect={addUser}
                    style={{
                  width: '80%',
                  marginTop: 48,
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
            </View>

        </SafeAreaView>

    )
}

const makeStyles = theme => ({
  userList: {
    width: '80%',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: theme.backgroundColor,
    borderRadius: theme.borders.borderRadius3,
    ...theme.elevation[4]
  },
  removeIcon: {
    right: 0,
    position: 'absolute',
  }
})
export default CreateRoomScreen;
