// required buildin Function from firebase
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// get useAuthcontext with apply context
import { useAuthContext } from "./useAuthContext";
// required useState with remember state
import { useState } from "react";

export const useLogin = () => {
  //create array of error set init is null
  const [error, setError] = useState(null);
  // destruct function  dispatch with mutage state from useAuthContext
  const { dispatch } = useAuthContext();
  // create function login with user send email and password
  const login = (email, password) => {
    //apply function  from firebase and send myauth , email, password from user
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
	      //check type is login and send data of user 
        dispatch({ type: "LOGIN", payload: res.user });
      })
      .catch((err) => {
	      //error
        setError(err.message);
      });
  };
  // return with apply
  return { error, login };
};
