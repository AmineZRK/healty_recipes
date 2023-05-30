import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Modal, SafeAreaView,RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomBar from "../components/BottomBar";
import firebase from 'firebase/compat/app';
import { useNavigation} from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as ImagePicker from 'expo-image-picker';
import PlaceholderImage from '../assets/img-profiles/avatar.jpg';
export default function Profile() {
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    fetchUserData()
  }, []);

  const fetchUserData = ()=>{

  
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
    }
  const handleEmailEdit = async () => {
    try {
      const user = firebase.auth().currentUser;
  
      // Prompt the user to reauthenticate
      // const credentials = await firebase.auth().signInWithEmailAndPassword(user.email, currentPassword);
  
      // Update the email in Firebase Authentication
      await user.updateEmail(newEmail);
  
      // Update the email in Firestore
      const uid = user.uid;
      await firebase.firestore().collection('users').doc(uid).update({
        Email: newEmail,
      });
  
      Alert.alert('Success', 'Email updated successfully');
      setNewEmail('');
    } catch (error) {
      console.error('Error updating email:', error);
      Alert.alert('Error', 'Failed to update email');
    }
  };

  
  const handleProfileImageEdit = async () => {
    try {
      const uid = firebase.auth().currentUser.uid;
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!response.cancelled) {
        const imageUrl = await uploadImage(response.uri, uid);
        await firebase.firestore().collection('users').doc(uid).update({
          profileImage: imageUrl,
        });

        Alert.alert('Success', 'Profile image updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
      Alert.alert('Error', 'Failed to update profile image');
    }
  };
  const uploadImage = async (uri, uid) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageName = `profileImages/${uid}`;
      const ref = firebase.storage().ref().child(imageName);
      await ref.put(blob);
      const imageUrl = await ref.getDownloadURL();
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    fetchUserData();
    setRefreshing(false);
  };
  const handleSettings = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  if (!user) {
    // Display a loading state or placeholder while fetching the user data
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
 
  return (
    <SafeAreaView style={styles.container}>
    
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity  style={styles.backButton}>
            <Ionicons onPress={() => navigation.navigate('Home')} name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Édition de l'utilisateur</Text>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <Image source={{uri : user.Profile_Image}} style={styles.profileImage} />
      
      
        <View style={styles.userInfoContainer}>
          <Text style={styles.name}>{user.Name}</Text>
        </View>
  
      <View style={styles.emailContainer}>
        <Text style={styles.details}>{user.Email}</Text>
      </View>
      <View style={styles.infosContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('EditePhoto')} style={[styles.editButton]}>
              <Text style={{fontWeight:'bold', color:'#FFF',}}>Image</Text>
              <MaterialIcons name="chevron-right" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditeName')} style={[styles.editButton]}>
              <Text style={{fontWeight:'bold', color:'#FFF',}}>Nom</Text>
              <MaterialIcons name="chevron-right" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditeEmail')} style={[styles.editButton]}>
              <Text style={{fontWeight:'bold', color:'#FFF',}}>Email</Text>
              <MaterialIcons name="chevron-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
      </ScrollView>
      
        
      
    </View>
    
    <BottomBar namePage="Home" />
    
    </SafeAreaView>
    
  );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      padding:10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      marginBottom: 16,
    },
   
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 75,
    },
  
  title:{
    fontSize:25,
    color:'green',
  },
    editIconContainer: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      backgroundColor: 'green',
      borderRadius: 15,
      padding: 5,
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
      flexDirection:'row',
      marginTop: 10,
      backgroundColor: 'green',
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      gap:190,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
