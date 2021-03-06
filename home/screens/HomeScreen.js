
import React, { useState, useEffect } from 'react';
import { StyleSheet,RefreshControl, Dimensions, Text, View, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
import {useAuth} from "../../auth/AuthenticationContext";
import EmptyCardCTA from "../../hands/components/EmptyHandCTA";
import HandCard from "../../hands/components/HandCard";
import {useFetchHands} from "../../hands/hooks/useFetchHands";
import RoomCard from "../../rooms/components/RoomCard";
import {useFetchRooms} from "../../rooms/hooks/useFetchRooms";
import Typography from "../../shared/components/Typography";
import UserAvatar from "../../shared/components/UserAvatar";
import {useTheme} from "../../shared/theme/ThemeContext";
import routes from '../../shared/routes';

const HomeScreen = ({ navigation }) => {

  const { user, logout} = useAuth();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const { fetch: fetchRooms, data: rooms } = useFetchRooms();
  const { fetch: fetchHands, data: hands } = useFetchHands();

  const [text, setText] = useState(null);

  const colors = ['red','brown','white','green','gray','purple','grey'];

  const [backgroundColor, setBackgroundColor] = useState("#fff");

  const fetchAll = async () => {
    fetchRooms();
    fetchHands();
  }
  useEffect(() => {
    fetchAll();
  }, []);

  const memoRooms = React.useCallback(() => {
    if (rooms.length > 0) {
      return rooms.slice(0, rooms.length > 0 ? 3 : rooms.length);
    }
    return [];
  }, [rooms]);

  const memoHands = React.useCallback(() => {
    if (hands.length > 0) {
      return hands.slice(0, hands.length > 0 ? 3 : hands.length);
    }
    return [];
  }, [hands]);


  const doLogout = () => {
    logout();
  };
  return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={false} onRefresh={fetchAll}/>}>
          <View style={styles.userInfo}>
            <UserAvatar user={user} size="small"/>
            <Typography variant="subtitle" color={"text"}>
              <Text>Welcome back, { user ? user.name : ""}</Text>
            </Typography>
            <TouchableOpacity style={styles.exit} onPress={doLogout}>
              <Typography variant="caption">
                Logout
              </Typography>
            </TouchableOpacity>
          </View>

          <View style={styles.hands}>

            {memoHands().length > 0
                ? (
                    <>
                      <Typography variant="body">
                        Your latest hands

                      </Typography>
                    <ScrollView horizontal={true}
                               contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      {memoHands().map(hand => (
                          <HandCard hand={hand} style={{flex: 1, width: "100%", height: '80%', marginRight: 16,
                            maxWidth: Dimensions.get('screen').width - 64,

                          }}/>
                      ))}
                    </ScrollView>

                    </>
                )
                :
                (
                    null
                )
            }
          </View>
          <View style={styles.rooms}>

            { memoRooms().length > 0
                ? (
                    <>
                    <Typography variant="body">
                      Latest rooms
                    </Typography>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                      { memoRooms().map(room => (
                          <RoomCard room={room}
                                    key={room.id}
                                    onPress={() => navigation.navigate(routes.ROOMS.DETAIL, { roomId: room._id, room })}
                                    style={{ flex: 1, width: "100%", height: '80%', marginRight: 16}}/>
                      ))}
                    </ScrollView>
                    </>

                )
                : (
                    <EmptyCardCTA title="No Rooms found. Create now a new one!"
                      onPress={() => navigation.navigate( routes.ROOMS.CREATE_STACK, { screen: routes.ROOMS.CREATE_ROOM_SCREEN })}
                    />
                )


            }

          </View>
        </ScrollView>
      </SafeAreaView>

  )
};


const makeStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    paddingBottom: 128,

  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 64,
    backgroundColor: theme.backgroundColor,
  },
  welcome: {
    backgroundColor: theme.palette.info.light,
    width: 300,
    height: 140,
    borderRadius: 12,
    padding: 12
  },
  hands: {
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  exit: {
    position: 'absolute',
    right: 0,

  }
});


export default HomeScreen;
