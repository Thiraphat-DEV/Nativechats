import { View, StyleSheet , Text} from "react-native";
import { useState, useEffect } from "react";
import { Input, Button } from "react-native-elements";

import { onAuthStateChanged } from "firebase/auth";
//require hook login
import { useLogin } from "../../Hooks/useLogin";
const Login = ({ navigation }) => {
  //init state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //destruct from login hook
  const {error, login} = useLogin()
  //login with email password
  const signIn = (e) => {
    //protect refresh page
    e.preventDefault()
    //Login for go to chat
    login(email, password)
    //clear field
    setEmail('')
    setPassword('')
    
  };
  //run effect with authentication
  useEffect(() => {
    // ถ้ามี user เข้ามา เเละ Login เสร็จ ให้เด้งไปที่หน้า chat
    const changeUser = onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Chat");
      } else {
        //ถ้าไม่มี ให้ เด้งกลับไปที่หน้า signUp
        navigation.canGoBack() && navigation.popToTop();
      }
    });
    
    return changeUser;
  }, []);
  return (
    // field enter email from user
    <View style={styles.container}>
      <Input
        label="Email"
        value={email}
        onChange={(text) => setEmail(text)}
        placeholder="Please Enter Your Email"
        leftIcon={{ type: "material", name: "email" }}
        textContentType="emailAddress"
        underlineColorAndroid="transparent"
      />

    {/* // field enter email from user */}
      <Input
        label="Password"
        placeholder="Please Enter Your Password"
        leftIcon={{ type: "material", name: "lock" }}
        onChange={(text) => setPassword(text)}
        value={password}
        textContentType="password"
        underlineColorAndroid="transparent"
        secureTextEntry
      />

      <Button title="Login" style={styles.btn} onPress={signIn} />
      <Button
        title="Signup"
        style={styles.btn}
        onPress={() => navigation.navigate("Signup")}
      />
{/*  check error*/}
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 3,
    alignItems: "center",
  },

  btn: {
    width: 200,
    margin: 10,
  },
});
export default Login;
