import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import React from 'react';


function BottomBar(props) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const actionNavigationHome = () => {
    navigation.navigate("Home");
  };

  const handlePost = () => {
    navigation.navigate("CreatePost");
  };

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handlePostsUser = () => {
    navigation.navigate("Posts-user");
  };

  const handleSettings = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Réinitialiser la valeur de modalVisible lorsque le composant est monté
      setModalVisible(false);

      return () => {
        // Réinitialiser la valeur de modalVisible lorsque le composant est démonté
        setModalVisible(false);
      };
    }, [])
  );

  return (
    <View style={styles.container} >
      <TouchableOpacity 
        style={{ padding: 10, borderRadius: 5 }} 
        onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={24} color="green" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={{ padding: 10, borderRadius: 5 }} 
        onPress={() => navigation.navigate('CreatePost')}>
        <Ionicons name="add-circle" size={24} color="green" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSettings} style={{ padding: 10, borderRadius: 5 }}>
        <Ionicons name="settings" size={24} color="green" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Paramètres</Text>
            <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            {/* Ajoutez ici les éléments de la modale */}
            <TouchableOpacity style={styles.modalItem} onPress={() => navigation.navigate('Profile')}>
              <Ionicons name="person" size={24} color="green" />
              <Text style={styles.modalItemText}>Informations profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => navigation.navigate('PostsUser')}>
              <Ionicons name="newspaper-outline" size={24} color="green" />
              <Text style={styles.modalItemText}>Mes publications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => navigation.navigate('Friends')}>
              <Ionicons name="people-outline" size={24} color="green" />
              <Text style={styles.modalItemText}>Ma liste d'amis</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => navigation.navigate('Discover')}>
              <Ionicons name="person-add-outline" size={24} color="green" />
              <Text style={styles.modalItemText}>Découvrir des personnes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => navigation.navigate('Login')}>
              <Ionicons name="log-out-outline" size={24} color="green" />
              <Text style={styles.modalItemText}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 43,
    backgroundColor: '#FFF', 
    borderBottomColor: '#DDDDDD',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    // alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  
});

export default BottomBar;
