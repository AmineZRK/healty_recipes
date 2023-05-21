import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function HeaderBar(props) {
  const navigation = useNavigation();

  const actionNavigationHome = () => {
    navigation.navigate("Home");
  };

  
  const handlePost = () => {
    navigation.navigate("CreatePost");
  };


  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handleLogout = () => {
    // Logique de déconnexion ici
  
    // Exemple de logique de déconnexion avec réinitialisation des données de l'utilisateur et redirection vers l'écran de connexion
    resetUserData(); // Fonction pour réinitialiser les données de l'utilisateur
    navigateToLogin(); // Fonction pour naviguer vers l'écran de connexion
  
    // Affichage d'une boîte de dialogue pour informer l'utilisateur de la déconnexion réussie
    Alert.alert('Déconnexion', 'Vous avez été déconnecté avec succès.');
  };
  


  return (
    <View style={styles.container}>
    <TouchableOpacity 
      style={{ padding: 10, borderRadius: 5 }} 
      onPress={() => navigation.navigate('Home')}>
      <Ionicons name="home" size={24} color="green" />
    </TouchableOpacity>

    <TouchableOpacity 
      style={{ padding: 10, borderRadius: 5 }} 
      onPress={(handlePost) => navigation.navigate('CreatePost')}>
      <Ionicons name="add-circle" size={24} color="green" />
    </TouchableOpacity>

    <TouchableOpacity 
      style={{ padding: 10, borderRadius: 5 }} 
      onPress={(handleProfile) => navigation.navigate('Profile')}>
      <Ionicons name="person" size={24} color="green" />
    </TouchableOpacity>

    <TouchableOpacity onPress={handleLogout} style={{ padding: 10, borderRadius: 5 }}>
      <Ionicons name="log-out-outline" size={24} color="red" />
    </TouchableOpacity>
  </View>
  );
}
export default HeaderBar;

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF', 
    paddingTop: 50,
    borderBottomWidth: 1,
    padding:12,
    borderBottomColor: '#DDDDDD',

    },
        
  title: {
    fontSize: 18,
    color:'green',
  },
});