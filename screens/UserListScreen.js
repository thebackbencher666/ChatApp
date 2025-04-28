// UsersListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const UsersListScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((user) => user.email !== auth.currentUser.email);
        setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleUserPress = (user) => {
    navigation.navigate('ChatScreen', { user });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item)}>
      <Text style={styles.username}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity style = {styles.userItem} onPress={() => handleUserPress(item)}>
                <text>{item.email}</text>
            </TouchableOpacity>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    fontSize: 18,
  },
});

export default UsersListScreen;
