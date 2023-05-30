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

const EditeEmail = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleEditEmail = async () => {
    try {
      const user = firebase.auth().currentUser;

      // Prompt the user to reauthenticate
      const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      await user.reauthenticateWithCredential(credentials);

      // Update the email in Firebase Authentication
      await user.updateEmail(email);

      // Update the email in Firestore
      const uid = user.uid;
      await firebase.firestore().collection('users').doc(uid).update({
        Email: email,
      });

      Alert.alert('Success', 'Email updated successfully');
      setEmail('');
      setCurrentPassword('');
    } catch (error) {
      console.error('Error updating email:', error);
      Alert.alert('Error', 'Failed to update email');
    }
  };

  
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons  onPress={() => navigation.navigate('Profile')} name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Modifier votre Email</Text>
      </View>
      <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            secureTextEntry={true}
            value={currentPassword}
            onChangeText={text => setCurrentPassword(text)}
          />
          <TouchableOpacity style={styles.editeButton} onPress={()=> handleEditEmail()}>
            <Ionicons name="pencil" size={20} color="white" />
          </TouchableOpacity>
      </View>
      <BottomBar namePage="EditeEmail" />
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

export default EditeEmail;
