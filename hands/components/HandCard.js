import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { useTheme } from "../../shared/theme/ThemeContext";
import moment from "moment-timezone";//"moment";

const HandCard = ({ hand }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <TouchableOpacity title=""
                          //onPress={}
                          style={styles.touchable}>
            <View style={{flex: 1}}>
                <Text style={styles.touchableTitle}>{hand.name}</Text>
                <Text style={styles.text}>{hand.description}</Text>
                <Text style={styles.subtitle}>Creation date:</Text>
                <Text style={styles.text}>{moment(hand.createdAt).tz('Europe/Berlin').calendar()}</Text>



            </View>
        </TouchableOpacity>
    )
};

const makeStyles = function(theme) {
    return StyleSheet.create({
        touchable:{
            flex: 1,
            width: '100%',
            backgroundColor: theme.palette.accent.main,
            marginTop: 25,
            borderRadius: theme.card.borderRadius,
            justifyContent: 'center',
            paddingHorizontal: 20,
            paddingVertical: 24,
            height: "100%",
            ...theme.elevation[8],
        },

        touchableTitle:{
            color: theme.palette.white,
            fontWeight: 'bold',
            fontSize: 28,
            textAlign: 'left',
            marginBottom: 8,
        },
        text: {
            color: theme.palette.white,
            fontSize: 20,
        },

        subtitle: {
            color: '#EDFF00',
            fontWeight: '700',
            fontSize: 20,
            marginTop: 8,
        }
    });
}


export default HandCard;

