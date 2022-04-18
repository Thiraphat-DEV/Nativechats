// required hook and 
import { useLayoutEffect, useState, useCallback } from "react";
import { View  } from "react-native";
import { auth, db } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";
// required giftedChat library 
import { GiftedChat } from "react-native-gifted-chat";
// required db method with add data
import { addDoc, collection } from "firebase/firestore";
const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  //SignOut with after authentication
  const signOutUser = () => {
      signOut(auth)
      .then(() => {
        //SignOut Successfully
        navigation.replace("Login");
      })
      .catch((error) => {
        // Error of Signout
        alert(error.messages);
      });
  };

  useLayoutEffect(() => {
    // set nav on widget 
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL, //show myImage
            }}
          />
        </View>
      ),
      headerRight: () => (
        //Show button signout user
        <TouchableOpacity style={{ marginRight: 10 }} onPress={signOutUser}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
    });

  }, []);
// create function sendMessage with apply useCallback send args is array message
  const onSendMessage = useCallback((messages = []) => {
    // get old message and new message to GiftedChat
    setMessages((previousMessages) =>
      GiftedChat.append(...previousMessages, messages)
    );
    // destruc data from mesages
    const { _id, createdAt, text, user } = messages;
    // add data to table chats
    addDoc(collection(db, 'chats'), {
      _id,
      createdAt,
      text,
      user
    })
  }, []);
  // show ChatMessage
  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage
      onSend={(messages) => onSendMessage(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
};

export default Chat;
