import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, View} from 'react-native';
import {useAPI} from "../../shared/api/APIContext";
import endpoints from "../../shared/endpoints";
import HandCard from "../../hands/components/HandCard";
import Icon from '@expo/vector-icons/AntDesign'
import {useTheme} from "../../shared/theme/ThemeContext";
import UserAvatar from "../../shared/components/UserAvatar";




const RoomDetailScreen = ({route, style, navigation}) => {

    const [hands, setHands] = useState([]);
    const { get } = useAPI();
    const theme = useTheme();
    const styles = makeStyles(theme);
    const {room} = route.params;
    const users = room.users ;

    const [isLoading, setIsLoading] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 16 }} onPress={() => navigation.navigate('Create Hand', {room})}>
                <Icon name="plus" size={18}/>
                </TouchableOpacity>
            ),
            title: room.name
        })
    });

    const fetchHands = async () => {
        try {
            setIsLoading(true);
            const hands = await get(endpoints.SESSIONS.GET_BY_ROOM, { roomId: room._id});
            setHands(hands.data);
        } catch (exception) {
            console.log("Impossibile leggere le sessioni: " + exception.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchHands();
    }, []);

    return (

        <SafeAreaView style={[styles.container, style]} >
            {/* isLoading ? <ActivityIndicator/> : null */}
            <ScrollView
                refreshControl={<RefreshControl onRefresh={fetchHands} refreshing={isLoading}/>}
                contentContainerStyle={{paddingHorizontal: 16}}>
                <Text style={styles.subtitle}>Utenti</Text>

                {Object.keys(users).map(key => (
                    <View style={{ marginBottom: 12, flexDirection: 'row', alignItems: 'center'}} key={users[key]._id}>
                        <UserAvatar user={users[key]} size={"medium"}/>
                        <Text>{users[key].name + " " + users[key].lastname}</Text>
                    </View>
                        ))}

                <Text style={styles.subtitle}>Active Hands</Text>
                { hands.map(hand => (<HandCard key={hand._id} hand={hand}/>))}


            </ScrollView>
        </SafeAreaView>
    )
}

const makeStyles = function(theme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "rgba(255,255,255, 0.4)",
        },


        subtitle: {
            color: theme.palette.text,
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'left',
            marginTop: 12,
            marginBottom: 8,
        },

        text: {
            color: theme.palette.text,
            fontSize: 16,
            textAlign: 'left',
        },
    })
}

export default RoomDetailScreen;

