import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomBar from "../components/BottomBar";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "doejohn@gmail.com",
    password: "John123",
    profileImage: require("../assets/img-profiles/avatar.jpg"),
  });

  return (
    <View style={styles.container}>
      <Image source={user.profileImage} style={styles.profileImage} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.details}>EMAIL: {user.email}</Text>
      <Text style={styles.details}>PASSWORD: {user.password}</Text>
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
