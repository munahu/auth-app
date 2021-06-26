import firebase from '../firebase';
import { useEffect, useState } from 'react';


function useFirebaseAuth() {
    const [user, setUser] = useState();

    async function createUser(email, password) {
      await (firebase.auth().createUserWithEmailAndPassword(email, password))
      .then(response => {
      })
    }
    
    function login(email, password) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    }
    
    function resetPassword (email) {
      firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        return;
      })
      .catch((error) => {
        return; 
     });
    }

    const signOut= () => {
      firebase.auth().signOut().then(function() {
        setUser(null);
      }, function(error) {
        console.error('Sign Out Error', error);
      });
      return;
    }
    
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        }
      });
      return unsubscribe
      }, [user])

    return {
        createUser, login, resetPassword,  signOut, user
    }
}

export default useFirebaseAuth