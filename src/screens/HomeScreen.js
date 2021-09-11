import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import Loading from '../components/Loading';

export default function HomeScreen({ navigation }) {

  const { user, logout } = useContext(AuthContext);

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            // give defaults, will be used if these fields are not there in actual data
            name: '',
            latestMessage: {
              text: ''
            },
            ...documentSnapshot.data(),
          };
        });

        // console.log(threads);
        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // console.log(threads);
  return (
    <View style={styles.container}>
      <FormButton 
        modeValue='contained' 
        title='Logout' 
        onPress={() => logout()}
      />
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Room', { thread: item })}
          >
            <List.Item
              title={item.name}
              description={item.latestMessage.text}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <Title>Home Screen</Title>
  //     <Title>All chat rooms will be listed here</Title>
  //     <Title>{user.uid}</Title>
  //     <FormButton 
  //       modeValue='contained' 
  //       title='Logout' 
  //       onPress={() => logout()}
  //     />
  //       {/* <FormButton
  //         modeValue='contained'
  //         title='Add Room'
  //         onPress={() => navigation.navigate('AddRoom')}
  //       /> */}
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#f5f5f5',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });