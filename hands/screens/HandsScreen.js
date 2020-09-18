import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {useAuth} from "../../auth/AuthenticationContext";
import {useAPI} from "../../shared/api/APIContext";
import endpoints from "../../shared/endpoints";
import HandCard from "../components/HandCard";

const HandsScreen = ({navigation}) => {

    const [hands, setHands] = useState([]);
    const { user } = useAuth();
    const { get } = useAPI();


    const fetchHands = async () => {
        try {
            setIsLoading(true);
            const hands = await get(endpoints.SESSIONS.GET_BY_CREATOR, { creatorId: user.id });
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
        <SafeAreaView containerStyle={styles.container}>
            <ScrollView
                refreshControl={<RefreshControl onRefresh={fetchHands} refreshing={isLoading}/>}
                contentContainerStyle={{paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center'}}>
                { hands.map(hand => (<HandCard key={hand._id} hand={hand}/>))}


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

    export default HandsScreen;

