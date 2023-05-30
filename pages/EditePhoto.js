import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Image, 
  StyleSheet,
  SafeAreaView
 } from 'react-native';
import { useNavigation} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import BottomBar from '../components/BottomBar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import * as ImagePicker from 'expo-image-picker';

const EditePhoto = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState('');

  const handleEditePhoto = async () => {
    try {
      // Get the current user's UID
      const uid = firebase.auth().currentUser.uid;
  
      // Create a reference to the Firebase Storage
      const storageRef = firebase.storage().ref();
      
      // Check if an image is selected
      if (image !== '') {
        // Create a unique filename for the image
        const filename = `${uid}_${Date.now()}.jpg`;
        
  
        // Get the image path from the image picker result
        const imageUri = image;
        
        // Upload the image to Firebase Storage
        const response = await fetch(imageUri);
        console.log(response)
        const blob = await response.blob();
        const imageRef = storageRef.child(`Profil/${filename}`);
        await imageRef.put(blob);
        
        // Get the URL of the uploaded image
        const imageURL = await imageRef.getDownloadURL();
  
        // Create a new post object
        const post = {
          
        };
  
        // Edit Photo
        await firebase.firestore().collection('users').doc(uid).update({
          Profile_Image: imageURL,
        });
       
  
        console.log('Post added successfully');
  
        // Reset the input values
        setImage('');
      } else {
        console.log('Please select an image');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  
  // Image picker function
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access camera roll denied');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons  onPress={() => navigation.navigate('Profile')} name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Modifier votre photo</Text>
      </View>
      <View style={styles.formContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity>
          <Text></Text>
          <TouchableOpacity style={styles.updateButton} onPress={()=>handleEditePhoto()}>
            <Ionicons name="pencil" size={20} color="white" />
          </TouchableOpacity>
      </View>
      <BottomBar namePage="CreatePost" />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop:10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 0,
    color: 'green', // Couleur du texte du titre
  },
  formContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 150, 
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 0,
  },
  updateButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
  },
  buttonText:{
    color:'#FFF',
  },
});

export default EditePhoto;
