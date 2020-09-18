import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, RefreshControl, StyleSheet, ActivityIndicator} from 'react-native';
import {useAuth} from "../../auth/AuthenticationContext";
import {useAPI} from "../../shared/api/APIContext";
import endpoints from "../../shared/endpoints";
import RoomCard from "../components/RoomCard";

//
// const rooms = [
//     {
//         name: "Room 1",
//         description: "Description 1"
//     },
//     {
//         name: "Room 2",
//         description: "Description 2"
//     }
// ]
const RoomsScreen = ({navigation, style}) => {

    const [rooms, setRooms] = useState([]);
    const { user } = useAuth();
    const { get } = useAPI();
    let getRoomsUrl = endpoints.ROOMS.GET_MANY;
    const fetchRooms = async () => {
        try {
            setIsLoading(true);
            const rooms = await get(getRoomsUrl, { userId: user.id });
            setRooms(rooms.data);
        } catch (exception) {
            console.log("Impossibile leggere le stanze: " + exception.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, []);

    const onCardPress=(room)=>{navigation.navigate('Details Room', {id:room._id, room})};

  //   const orderedRooms = rooms.sort((a, b) => a.createdAt > b.createdAt);
    return (
        <SafeAreaView style={[styles.container, style]} >
            {/* isLoading ? <ActivityIndicator/> : null */}
            <ScrollView
                refreshControl={<RefreshControl onRefresh={fetchRooms} refreshing={isLoading}/>}
                contentContainerStyle={{paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center'}}>
                { rooms.map(room => (<RoomCard key={room._id} room={room} onPress={()=> onCardPress(room)}/>))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255, 0.4)",

    },
})

export default RoomsScreen;

