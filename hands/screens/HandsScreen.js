import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';

const HandsScreen = () => {

    return (
        <SafeAreaView containerStyle={styles.container}>
            <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity title=""
                                  onPress={()=>{}}
                                  style={styles.touchable}>
                    <View style={{flex: 1}}>
                    <Text style={styles.touhableTitle}>Prova1</Text>

                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity title=""
                                  onPress={()=>{}}
                                  style={styles.touchable}>
                    <View style={{flex: 1}}>
                        <Text style={styles.touhableTitle}>Prova2</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity title=""
                                  onPress={()=>{}}
                                  style={styles.touchable}>
                    <View style={{flex: 1}}>
                        <Text style={styles.touhableTitle}>Prova3</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity title=""
                                  onPress={()=>{}}
                                  style={styles.touchable}>
                    <View style={{flex: 1}}>
                        <Text style={styles.touhableTitle}>Prova4</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                        <Text style={{paddingVertical: 10}}>Testo1</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255, 0.4)",
        justifyContent: 'center',
        alignItems: 'center',
    },

    touchable:{
        flex: 1,
        backgroundColor: '#FC4710',
        marginTop: 25,
        borderRadius: 25,
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        width: "85%",
        height: "100%",
    },

    touhableTitle:{
        color: '#fff',
        fontSize: 40,
        textAlign: 'left',
    },
})

    export default HandsScreen;

