import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
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
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import 'firebase/compat/auth';


const Login = () => {
const navigation = useNavigation();    
const [email, setEmail] = useState("");
const [Password, setPassword] = useState("");

const auth = getAuth();

const handleSignIn = () => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, Password)
    .then((userCredential) => {
    // Handle successful sign-in
    console.log("Successful sign-in");
    // Navigate to the home page
    navigation.navigate('Home');
      
    })
    .catch((error) => {
      console.log("Error during sign-in:", error);
      // Display an alert or handle the error
      Alert.alert("Error", "Invalid email or password");
    });
};


  return (
    <ImageBackground 
      source ={require('../assets/images/imgSignin.webp')} 
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
        <Text style={[styles.textTitle, styles.shadowProp]}>Login Form</Text>
        <Text style={styles.textSubTitle}>
          We're so excited to see you again!
        </Text>
      </View>
      <View>
        <Text style={styles.textAccountInformation}>ACCOUNT INFORMATION</Text>
        <TextInput
          // onSubmitEditing={() => ref_input2.current.focus()}
          returnKeyType={"next"}
          placeholder="Email"
          autoFocus={true}
          onChangeText={(newText) => setEmail(newText)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          clearButtonMode="always"
          placeholder="Password"
          onChangeText={(newText) => setPassword(newText)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          style={styles.input}
          // ref={ref_input2}
        />
      </View>
      <View>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="white"
          style={[styles.item, styles.shadowProp]}
          onPress={() => handleSignIn()}
        >
          <Text  style={{fontWeight:"bold"}}>Login</Text>
        </TouchableHighlight>
        <TouchableOpacity
          style={styles.signUpButon}
          onPress={()=>{handleSignIn()}}
        >
          <Text 
            style={{ color: "white", fontWeight: "bold" }}>Go to Sign up
          </Text>
        </TouchableOpacity >
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
    textSubTitle: {},
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
  

export default Login;
