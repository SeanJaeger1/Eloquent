import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const UpdateSkillLevelPage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  const setSkillLevel = async (skillLevel) => {
    try {
      if (!userId) {
        throw new Error('User is not authenticated.');
      }

      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        skillLevel,
      });

      console.log(`Updated skill level to ${skillLevel}`);
    } catch (error) {
      console.error('Error updating skill level: ', error);
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your English level</Text>
      <Text style={styles.subtitle}>Let’s get started! 👋</Text>
      <TouchableOpacity style={styles.button} onPress={() => setSkillLevel('beginner')}>
        <Text style={styles.buttonText}>Beginner</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSkillLevel('intermediate')}>
        <Text style={styles.buttonText}>Intermediate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSkillLevel('advanced')}>
        <Text style={styles.buttonText}>Advanced</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSkillLevel('expert')}>
        <Text style={styles.buttonText}>Expert</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#78CCCC',
    padding: 18,
    marginBottom: 10,
    borderRadius: 8,
    height: 64
  },
  buttonText: {
    fontSize: 24,
    color: 'white'
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 60,
    textAlign: "left",

  },
});

export default UpdateSkillLevelPage;
