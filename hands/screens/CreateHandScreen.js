import React, { useState } from 'react';
import {SafeAreaView, ScrollView, Text, TextInput, Button} from "react-native";

import {useErrorContext} from "../../shared/notification/ErrorContext";
import {useTheme} from "../../shared/theme/ThemeContext";
import {useAPI} from "../../shared/api/APIContext";
import {useAuth} from "../../auth/AuthenticationContext";
import endpoints from "../../shared/endpoints";



const CreateHand=({navigation, style, route}) => {

    const theme = useTheme();
    const { user } = useAuth();
    const { post } = useAPI();
    const { addError, removeError } = useErrorContext();
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);

    const {room} = route.params;

    const styles = makeStyles(theme);


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={createHand} title="Done" disabled={!name}/>
            )
        })
    });
    const createHand = async () => {
        try {
            removeError();
            if (!name) {
                addError("Please fill the name field");
                return;
            }
            await post(endpoints.SESSIONS.POST, {
                name,
                description,
                creatorId: user.id,
                roomId: room._id
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
                contentContainerStyle={{marginTop: 180}}>
                <Text style={theme.textInput.label}>Name</Text>
                <TextInput
                    placeholder="Type the name of the hand"
                    style={styles.textInputStyle} onChangeText={setName}/>

                <Text style={theme.textInput.label}>Description</Text>
                <TextInput
                    placeholder="Write a description"
                    style={styles.textInputStyle} onChangeText={setDescription}/>

            </ScrollView>

        </SafeAreaView>

    )
}

const makeStyles = theme => ({

    textInputStyle: {
        backgroundColor: theme.textInput.backgroundColor,
        marginBottom: theme.textInput.marginBottom,
        paddingVertical: 12,
        paddingHorizontal: 12,
        width: '100%',
    },
})
export default CreateHand;
