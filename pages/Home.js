import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomBar from "../components/BottomBar";
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'John Doe',
        profileImage: require('../assets/img-profiles/avatar.jpg'),
      },
      showCommentInput: false,
      comment: '',
      likes: 0,
      isLiked: false,
      date: '19/05/2023',
      title: 'Salade fraiche',
      description: "Ce recette est de base américaine, contenant de nombreux vitamines, elle participe à l'épanouissement de l'organisme quand elle est constament consommé.",
      image: require('../assets/images/recettes-saines-et-legeres.jpg'),
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        profileImage: require('../assets/img-profiles/avatar.jpg'),
      },
      showCommentInput: false,
      comment: '',
      likes: 0,
      isLiked: false,
      date: '19/05/2023',
      title: 'Trois recettes de poulet',
      description: "Ce recette est de base américaine, contenant de nombreux vitamines, elle participe à l'épanouissement de l'organisme quand elle est constament consommé.",
      image: require('../assets/images/trois-recettes-de-poulet.jpg'),
    },
  ]);

  const handleCommentPress = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, showCommentInput: !post.showCommentInput };
        }
        return post;
      })
    );
  };

  const handleCommentChange = (postId, text) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, comment: text };
        }
        return post;
      })
    );
  };

  const handleCommentSubmit = (postId) => {
    // Ajoutez ici la logique pour soumettre le commentaire à votre backend
    console.log('Comment submitted for post', postId);
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, comment: '', showCommentInput: false };
        }
        return post;
      })
    );
  };

  const handleLikePress = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const updatedLikes = post.isLiked ? post.likes - 1 : post.likes + 1;
          return { ...post, likes: updatedLikes, isLiked: !post.isLiked };
        }
        return post;
      })
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.container}>
      {posts.map((post) => (
        <View style={styles.card} key={post.id}>
          <View style={styles.userContainer}>
            <Image source={post.user.profileImage} style={styles.profileImage} />
            <Text style={styles.userName}>{post.user.name}</Text>
          </View>
          <Image source={post.image} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.date}>Publié le {post.date}</Text>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description}</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => handleCommentPress(post.id)}>
                <Ionicons name="chatbubble-outline" size={24} color="gray" style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleLikePress(post.id)}>
                <Ionicons
                  name={post.isLiked ? "heart" : "heart-outline"}
                  size={24}
                  color={post.isLiked ? "red" : "gray"}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={styles.likes}>{post.likes}</Text>
              <Ionicons name="share-outline" size={24} color="gray" style={styles.icon} />
            </View>
            {post.showCommentInput && (
              <View style={styles.commentContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Ajouter un commentaire..."
                  value={post.comment}
                  onChangeText={(text) => handleCommentChange(post.id, text)}
                />
                <TouchableOpacity onPress={() => handleCommentSubmit(post.id)}>
                  <Ionicons name="send" size={24} color="gray" style={styles.sendIcon} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ))}
      
    </ScrollView>
    <BottomBar namePage="Home"/>
    </SafeAreaView>
  );
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    elevation: 2,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 8,
  },
  content: {
    padding: 16,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#444',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  icon: {
    marginRight: 12,
  },
  likes: {
    fontSize: 16,
    color: 'gray',
    marginRight: 8,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  commentInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  sendIcon: {
    marginLeft: 8,
  },
});

export default Home;
