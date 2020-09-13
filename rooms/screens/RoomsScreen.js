import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {get} from "../../shared/api/fetch";
import endpoints from "../../shared/endpoints";
import RoomCard from "../components/RoomCard";

const USER_ID = "5f5a2b2c89e3b6a308ba73a0";

const rooms = [
    {
        name: "Room 1",
        description: "Description 1"
    },
    {
        name: "Room 2",
        description: "Description 2"
    }
]
const RoomsScreen = () => {

    const [rooms, setRooms] = useState([]);

    let getRoomsUrl = endpoints.ROOMS.GET_MANY;

    const fetchRooms = async () => {
        try {
            const rooms = await get(getRoomsUrl, { userId: USER_ID });
            setRooms(rooms);
        } catch (exception) {
            console.log("Impossibile leggere le stanze: " + exception.message);
        }
    }


    useEffect(() => {
        fetchRooms();
    }, []);
    return (
        <SafeAreaView style={styles.container} >
            <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                { rooms.map(room => (<RoomCard room={room}/>)) }
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

