import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import {useAuth} from "../../auth/AuthenticationContext";
import {useAPI} from "../../shared/api/APIContext";
import endpoints from "../../shared/endpoints";
import RoomCard from "../components/RoomCard";
import routes from '../../shared/routes';
import {useFetchRooms} from "../hooks/useFetchRooms";

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

    const { user } = useAuth();
    const { get } = useAPI();
    const { data, fetch, refresh, loading, refreshing } = useFetchRooms();

    useEffect(() => {
        fetch();
    }, []);

    const onCardPress=(room)=>{navigation.navigate(routes.ROOMS.DETAIL, {roomId:room._id, room})};

  //   const orderedRooms = rooms.sort((a, b) => a.createdAt > b.createdAt);
    return (
        <SafeAreaView style={[styles.container, style]} >
            {/* isLoading ? <ActivityIndicator/> : null */}
            <ScrollView
                refreshControl={<RefreshControl onRefresh={refresh} refreshing={refreshing}/>}
                contentContainerStyle={{paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center'}}>
                { data.map(room => (<RoomCard key={room._id} room={room} onPress={()=> onCardPress(room)}/>))}
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

