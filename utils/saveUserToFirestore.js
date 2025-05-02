// utils/saveUserToFirestore.js
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Adjust the path based on your folder structure

const saveUserToFirestore = async () => {
  const user = auth.currentUser;
  if (!user) return;

  await setDoc(doc(db, 'users', user.uid), {
    id: user.uid,
    email: user.email,
  });
};

export default saveUserToFirestore;
