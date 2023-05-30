import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Image, 
  StyleSheet,
  Alert,
  SafeAreaView
 } from 'react-native';
import { useNavigation} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import BottomBar from '../components/BottomBar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const EditeName = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const handleEditName = async () => {
    try {
      const uid = firebase.auth().currentUser.uid;

      await firebase.firestore().collection('users').doc(uid).update({
        Name: name,
      });

      Alert.alert('Success', 'Name updated successfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Profile', { updatedName: name });
          },
        },
      ]);
      setName('');
    } catch (error) {
      console.error('Error updating name:', error);
      Alert.alert('Error', 'Failed to update name');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons  onPress={() => navigation.navigate('Profile')} name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Modifier votre nom</Text>
      </View>
      <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TouchableOpacity style={styles.editeButton} onPress={()=>handleEditName()}>
            <Ionicons name="pencil" size={20} color="white" />
          </TouchableOpacity>
      </View>
      <BottomBar namePage="EditeName" />
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
  editeButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default EditeName;
