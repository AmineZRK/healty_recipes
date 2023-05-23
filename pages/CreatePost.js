import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import BottomBar from '../components/BottomBar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import * as ImagePicker from 'expo-image-picker';

const CreatePost = () => {
  
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddPost = async () => {
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
        const imageRef = storageRef.child(`images/${filename}`);
        await imageRef.put(blob);
        
        // Get the URL of the uploaded image
        const imageURL = await imageRef.getDownloadURL();
  
        // Create a new post object
        const post = {
          user: uid,
          title: title,
          content: description,
          imageURL: imageURL,
          date: new Date(),
          isLiked: false,
          comments: [],
          likes: 0,
        };
  
        // Add the post to Firestore
        await firebase.firestore().collection('posts').add(post);
  
        console.log('Post added successfully');
  
        // Reset the input values
        setImage('');
        setTitle('');
        setDescription('');
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
    <View style={styles.container}>
      <View style={styles.navbar}>
        {/* Contenu de votre barre de navigation */}
        {/* <HeaderBar namePage={'CreatePost'} /> */}
      </View>
      <Text style={styles.title}>Créer une nouvelle recette</Text>
      <View style={styles.formContainer}>
      <TouchableOpacity style={styles.addButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Titre"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={()=>handleAddPost()}>
          <Text style={styles.buttonText}>Créer le post</Text>
        </TouchableOpacity>
      </View>
      <BottomBar namePage="CreatePost" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop:180,
  },
  navbar: {
    backgroundColor: '#f5f5f5',
    alignSelf: 'stretch',
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 0,
    color: 'green', // Couleur du texte du titre
  },
  formContainer: {
    flex: 1,
    padding: 20,
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
  addButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default CreatePost;
