import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomBar from "../components/BottomBar";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Get the current user's UID
    const uid = firebase.auth().currentUser.uid;
    
    
    // Retrieve the user document from Firestore
    firebase.firestore().collection('users').doc(uid).get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data())
          // Set the user state with the retrieved data
          setUser(doc.data());
        } else {
          console.log("User document not found");
        }
      })
      .catch((error) => {
        console.error("Error retrieving user document:", error);
      });
  }, []);
  if (!user) {
    // Display a loading state or placeholder while fetching the user data
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
 
  return (
    <View style={styles.container}>
      <Image source={user.profileImage} style={styles.profileImage} />
      <Text style={styles.name}>{user.Name}</Text>
      <Text style={styles.details}>EMAIL: {user.Email}</Text>
      <TouchableOpacity style={styles.editButton}>
        <View style={styles.editButtonBackground}>
          <Ionicons name="pencil" size={24} color="white" />
        </View>
      </TouchableOpacity>
      <View style={styles.footer}>
        <BottomBar namePage="Home" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  editButton: {
    marginTop: 10,
  },
  editButtonBackground: {
    backgroundColor: 'green',
    borderRadius: 15,
    padding: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
});
