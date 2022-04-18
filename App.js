import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//require Login and Signup page
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import Chat from "./screens/Chat/Chat";

import { AuthContextProvider } from "./context/AuthContext";
const Page = createStackNavigator(); // create Router

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Page.Navigator>
          {/*  Add Route Component */}
          <Page.Screen name="Login" component={Login} />
          <Page.Screen name="Signup" component={Signup} />
          <Page.Screen name="Chat" component={Chat} />
        </Page.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}
