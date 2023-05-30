import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomBar from "../components/BottomBar";
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const uid = firebase.auth().currentUser.uid;
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const snapshot = await firebase.firestore().collection('posts').get();
      const fetchedPosts = [];
      
      for (const doc of snapshot.docs) {
        const postData = doc.data();
        const date = postData.date.toDate();
        // Fetch user data based on the userId in the post document
        const userSnapshot = await firebase.firestore().collection('users').doc(postData.user).get();
        const userData = userSnapshot.data();
        
        // Combine post data and user data into a single object
        if (userData){
          const post = {
            id: doc.id,
            ...postData,
            date,
            user: {
              name: userData.Name,
              image: userData.Profile_Image
            },
          };
          fetchedPosts.push(post);
          console.log(post)
        }else{
          console.error('User data not found for post', doc.id);

        }
       
  
        
      }
      setPosts(fetchedPosts);
    }  catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

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

  const handleLikePress = async (postId, userId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const likedBy = post.likedBy || []; // Default to an empty array if likedBy is undefined
          const likedByCurrentUser = likedBy.includes(userId);
          let updatedLikes = post.likes;
          let updatedIsLiked = post.isLiked;
          let updatedLikedBy = likedBy;
  
          if (likedByCurrentUser) {
            // Remove the current user's ID from likedBy and decrease the likes count
            updatedLikes = post.likes - 1;
            updatedLikedBy = likedBy.filter((id) => id !== userId);
          } else {
            // Add the current user's ID to likedBy and increase the likes count
            updatedLikes = post.likes + 1;
            updatedLikedBy = [...likedBy, userId];
          }
  
          firebase
            .firestore()
            .collection('posts')
            .doc(postId)
            .update({
              likes: updatedLikes,
              likedBy: updatedLikedBy
            })
            .then(() => {
              console.log('Post updated successfully');
            })
            .catch((error) => {
              console.error('Error updating post:', error);
            });
  
          // Update the isLiked flag based on the updated likedBy array
          updatedIsLiked = updatedLikedBy.includes(userId);
  
          // Return the updated post object
          return { ...post, likes: updatedLikes, isLiked: updatedIsLiked, likedBy: updatedLikedBy };
        }
        return post;
      })
    );
  };
  

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  };
  console.log(posts)
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      {posts.map((post) => (
        <View style={styles.card} key={post.id}>
          <View style={styles.userContainer}>
            <Image  source={post.user.image ? { uri: post.user.image } : require('../assets/img-profiles/avatar.jpg')} style={styles.profileImage} />
            <Text style={styles.userName}>{post.user.name}</Text>
          </View>
          <Image source={{uri : post.imageURL}} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.date}>Publié le {post.date.toLocaleDateString()}</Text>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.content}</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => handleCommentPress(post.id)}>
                <Ionicons name="chatbubble-outline" size={24} color="gray" style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleLikePress(post.id,uid)}>
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
