import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ImageBackground ,
  StatusBar ,
} from "react-native";
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDov17ALUBYKsRRPqR6xxYGLq2Xs66_rtw",
  authDomain: "recipes-app-c60eb.firebaseapp.com",
  projectId: "recipes-app-c60eb",
  storageBucket: "recipes-app-c60eb.appspot.com",
  messagingSenderId: "708037718915",
  appId: "1:708037718915:web:acb4159698d39547693cb6",
  measurementId: "G-Z1V69ZH6S3"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    console.log(password, email)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
        console.log('Signup successful:', user);
    })
    .catch((error) => {
      const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Signup error:', errorCode, errorMessage);
      console.log(error);
    });
    
  };

  return (
    <ImageBackground 
      source ={require('../assets/images/imgSignup.webp')} 
      style = {styles.imageBackground}>
      <StatusBar style="auto" />
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          // backgroundColor: "green",
        }}
      >
        <View
          style={{
            marginTop: 120,
            width: 300,
            height: 150,
            alignItems: "center",
          }}
        >
          <Text style={[styles.textTitle, styles.shadowProp]}>Register Form</Text>
          <Text style={styles.textSubTitle}>Let introduce yourself!</Text>
        </View>
        <View>
          <Text style={styles.textAccountInformation}>ACCOUNT INFORMATION</Text>
          <TextInput
            onChangeText={(newText) => setUsername(newText)}
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <TextInput
            onChangeText={(newText) => setEmail(newText)}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <TextInput
            onChangeText={(newText) => setPassword(newText)}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => {
              handleSignup();
            }}
            activeOpacity={1}
            underlayColor="white"
            style={[styles.item, styles.shadowProp]}
          >
          <Text  style={{fontWeight:"bold"}}>Register</Text>
          </TouchableHighlight>
          <TouchableOpacity
            style={styles.signUpButon}
            // onPress={actionNavigationLogin}
          >
            <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
              Go to login page
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },

  signUpButon: {
    // alignSelf: "flex-end",
    textAlign: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  textTitle: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textSubTitle: {
    color:'#000',
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255, 0.3)",
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    width: 300,
    height: 50,
    backgroundColor: "white",
    borderRadius: 3,
    fontSize: 13,
  },
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  imageStyle: {
    marginTop: 10,
    flex: 1,
  },
  imageProfile: {
    height: 40,
    width: 40,
    flex: 1,
    marginRight: 10,
    borderRadius: 100,
  },
  userInfoText: {
    justifyContent: "center",
  },
  logoEmoji: {
    fontSize: 100,
  },
  textAccountInformation: {
    fontSize: 13,
    fontWeight: "bold",
    color:'#000',
    textAlign:'center',
  },
  textInput: {
    fontSize: 12,
  },
  profileInformations: {
    flexDirection: "row",
  },
  item: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 50,
    backgroundColor: "rgba(355, 355, 355, 0.3)",
    borderRadius: 3,
    marginBottom: 20,
  },
});

export default Signup;
