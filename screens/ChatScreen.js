import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


const ChatScreen = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

// handle user sign out 
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('SignIn');
      })
      .catch((error) => console.log('Error signing out: ', error));
  };
//Real-Time listener for chat messages
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);
   //send new message
  const sendMessage = async () => {
    if (message.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: message,
        createdAt: new Date(),
        user: auth.currentUser.email,
      });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut} />
      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.msgContainer}>
            <Text style={styles.user}>{item.user}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  msgContainer: { 
    padding: 10, 
    marginBottom: 10,
    backgroundColor: '#e0e0e0', 
    borderRadius: 5,
 },
  user: { 
    fontWeight: 'bold',
    marginBottom: 4 },
  input: { 
    borderWidth: 1, 
    padding: 8,
    marginVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
},
});

export default ChatScreen;
