import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import PostsUser from "./pages/PostsUser";
import Profile from "./pages/Profile";
import Posts from "./pages/CreatePost";
import SignIn from "./pages/Login";
import SignUp from "./pages/Signup";
import InitialPage from "./pages/InitialPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
       <NavigationContainer>
           <Stack.Navigator
              initialRouteName="InitialPage"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="InitialPage" component={InitialPage} />
              <Stack.Screen name="Signup" component={SignUp} />
              <Stack.Screen name="Login" component={SignIn} />
              <Stack.Screen
                options={{
                  animation: "none",
                  gestureEnabled: false,
                }}
                name="Home"
                component={Home}
              />
              <Stack.Screen name="CreatePost" component={Posts} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="PostsUser" component={PostsUser} />
           </Stack.Navigator>
       </NavigationContainer>
      /*<View style={styles.container}>
        <Text>Healthy Education</Text>
        <StatusBar style="auto" />
      </View>*/
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
