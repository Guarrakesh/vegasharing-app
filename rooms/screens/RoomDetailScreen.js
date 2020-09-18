import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import {useAuth} from "../../auth/AuthenticationContext";
import {useAPI} from "../../shared/api/APIContext";
import endpoints from "../../shared/endpoints";
import HandCard from "../../hands/components/HandCard";
import Icon from '@expo/vector-icons/AntDesign'
import {useTheme} from "../../shared/theme/ThemeContext";



const RoomDetailScreen = ({route, style, navigation}) => {

    const [hands, setHands] = useState([]);
    const { user } = useAuth();
    const { get } = useAPI();
    const theme = useTheme();
    const styles = makeStyles(theme);
    const {room} = route.params;
    const users = room.users ;
    const names = users.map( user => user.name + ' ' + user.lastname)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 16 }} onPress={() => navigation.navigate('Create Hand', {room})}>
                <Icon name="plus" size={18}/>
                </TouchableOpacity>
            )
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

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchHands();
    }, []);

    return (

        <SafeAreaView style={[styles.container, style]} >
            {/* isLoading ? <ActivityIndicator/> : null */}
            <ScrollView
                refreshControl={<RefreshControl onRefresh={fetchHands} refreshing={isLoading}/>}
                contentContainerStyle={{paddingHorizontal: 16}}>
                <Text style={styles.titleRoom}>{room.name}</Text>
                <Text style={styles.subtitle}>Utenti</Text>
                <Text style={styles.text}>{names.join(', ')}</Text>
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

        titleRoom: {
            color: theme.palette.accent.main,
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
            marginTop: 12,
        },

        subtitle: {
            color: theme.palette.text,
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'left',
            marginTop: 12,
        },

        text: {
            color: theme.palette.text,
            fontSize: 16,
            textAlign: 'left',
        },
    })
}

export default RoomDetailScreen;

