import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { Input, Button } from "react-native-elements";

import { useSignup } from "../../Hooks/useSignup";
const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [myImg, setMyImg] = useState("");

  const { error, signup } = useSignup();
  //authen app
  const authenticate = (e) => {
    e.preventDefault();
    //register
    signup(email, password, name, myImg);
    //clear field
    setName('')
    setEmail('')
    setPassword('')
    setMyImg('')
    // login page
    navigation.popToTop();
  };
  return (
    <View style={styles.container}>
      <Input
        label="Your Name"
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Please Enter Your Name"
        leftIcon={{ type: "material", name: "person" }}
        textContentType="name"
        underlineColorAndroid="transparent"
      />

      <Input
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Please Enter Your Email"
        leftIcon={{ type: "material", name: "email" }}
        textContentType="emailAddress"
        underlineColorAndroid="transparent"
      />

      <Input
        label="Password"
        placeholder="Please Enter Your Password"
        leftIcon={{ type: "material", name: "lock" }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        underlineColorAndroid="transparent"
        secureTextEntry
      />
      <Input
        label="Your Image"
        value={myImg}
        onChangeText={(text) => setMyImg(text)}
        placeholder="Please Enter Your Image"
        leftIcon={{ type: "material", name: "image" }}
        underlineColorAndroid="transparent"
      />
      <Button title="Signup" onPress={authenticate} style={styles.btn} />
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
export default Signup;
