import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {get} from "../../shared/api/fetch";
import endpoints from "../../shared/endpoints";
import RoomCard from "../components/RoomCard";

const USER_ID = "5f5bdf4068deb50097958aac";
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
const RoomsScreen = ({navigation}) => {

    const [rooms, setRooms] = useState([]);

    let getRoomsUrl = endpoints.ROOMS.GETBYUSERID;
    getRoomsUrl = getRoomsUrl.replace(":userId", USER_ID);
    const fetchRooms = async () => {

        try {
            const rooms = await get(getRoomsUrl, {});
            setRooms(rooms);
        } catch (exception) {
            console.log("Impossibile leggere le stanze: " + exception.message);
        }
    }


    useEffect(() => {
        fetchRooms();
    }, []);

    const onCardPress=(room)=>{navigation.navigate('Details Room', {id:room._id, room})};

    return (
        <SafeAreaView style={styles.container} >
            <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
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

