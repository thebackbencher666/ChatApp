import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

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
  msgContainer: { padding: 10, marginBottom: 10, backgroundColor: '#eee', borderRadius: 5 },
  user: { fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
});

export default ChatScreen;
