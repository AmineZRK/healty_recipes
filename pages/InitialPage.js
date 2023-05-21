import { useNavigation } from "@react-navigation/native";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Image,
  ImageBackground ,
  StatusBar ,
 } from "react-native";

function InitialPage() {
  const navigation = useNavigation();

  const actionNavigationSignin = () => {
    navigation.navigate("Login");
  };
  const actionNavigationSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <ImageBackground 
      source ={require('../assets/images/imgAccueil.webp')} 
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
            marginTop: 100,
            marginBottom: 80,
            width: 300,
            height: 200,
            alignItems: "center",
          }}
        >
          <Text style={[styles.textTitle, styles.shadowProp]}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.image}
              />
          </Text>
          <Text style={styles.textSubTitle}>Healthy Education</Text>
          
        </View>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={styles.textAccountInformation}>
            Welcome to Healthy Education
          </Text>
          <Text style={{ fontStyle: "italic" }}>
            Join us to share with other users your best Healthy Recipes.
          </Text>
        </View>
        <View>
          <TouchableOpacity 
            onPress={actionNavigationSignin} 
            style={[styles.item]}>
            <Text  style={{fontWeight:"bold"}}>Signin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={actionNavigationSignup}
            style={[styles.item, styles.shadowProp, { backgroundColor: "white" }]}
          >
            <Text style={{fontWeight:"bold"}}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
export default InitialPage;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  signUpButon: {
    alignSelf: "flex-end",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  textTitle: {
    fontSize: 150,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textSubTitle: {
    color:"#fff",
    fontSize: 30,
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
