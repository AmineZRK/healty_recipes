import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import BottomBar from '../components/BottomBar';

const CreatePost = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddPost = () => {
    // Logique pour ajouter le post
    // Utilisez les valeurs de date, image, title et description pour créer le post
    // par exemple, envoyez les données au serveur ou ajoutez-les à une liste de posts

    // Réinitialisez les valeurs après l'ajout du post
    setImage('');
    setTitle('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {/* Contenu de votre barre de navigation */}
        {/* <HeaderBar namePage={'CreatePost'} /> */}
      </View>
      <Text style={styles.title}>Créer une nouvelle recette</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="URL de l'image"
          value={image}
          onChangeText={text => setImage(text)}
        />
        {image !== '' && <Image source={{ uri: image }} style={styles.image} />}
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
        <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
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
