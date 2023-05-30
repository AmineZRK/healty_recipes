import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import BottomBar from "../components/BottomBar";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const PlaceholderImage = require('../assets/img-profiles/avatar.jpg');

const NewFriendsDiscover = () => {
  const navigation = useNavigation();
  const [friendsData, setFriendsData] = useState([]);

  useEffect(() => {
    fetchFriendsData();
  }, []);

  const fetchFriendsData = async () => {
    try {
      const snapshot = await firebase.firestore().collection('users').get();
      const fetchedFriendsData = [];
      snapshot.forEach((doc) => {
        const userData = doc.data();
        const friendData = {
          id: doc.id,
          name: userData.Name,
          photo: userData.Profile_Image ? { uri: userData.Profile_Image } : PlaceholderImage,
        };
        fetchedFriendsData.push(friendData);
      });
      setFriendsData(fetchedFriendsData);
    } catch (error) {
      console.error('Error fetching friends data:', error);
    }
  };

  const renderFriendItem = ({ item }) => (
    <View style={styles.friendContainer}>
      <View>
        <Image source={item.photo} style={styles.friendPhoto} />
        <Text></Text>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Suivre</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.friendName}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons onPress={() => navigation.navigate('Home')} name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Propositions d'amis</Text>
      </View>
      <View style={styles.centerContainer}>
        <FlatList
          data={friendsData}
          renderItem={renderFriendItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.footer}>
        <BottomBar namePage="Home" />
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    color: 'green',
    fontSize: 24,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  followButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  followButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default NewFriendsDiscover;
