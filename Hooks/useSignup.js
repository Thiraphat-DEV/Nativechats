// required config and function from firebase
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
//required hook and context
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  // signup with 4 args email, password name, image
  const signup = (email, password, name, myImg) => {
    // apply function createUser and send auth email password with created
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // check type of changed and send data of user
        dispatch({ type: "LOGIN", payload: res.user });
        // update user Profile and Changed name and image
        res.user.updateProfile({
          displayName: name,
          photoURL: myImg
            ? myImg
            : "https://www.trackergps.com/canvas/images/icons/avatar.jpg",
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  // return to apply
  return { error, signup };
};
