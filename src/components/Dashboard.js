import firebase from 'firebase';
import { useEffect, useRef, useState } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import styles from '../styles/Dashboard.module.css';

function Dashboard() {
    const { signOut } = useFirebaseAuth();
    
    const { user } = useFirebaseAuth();

    const [name, setName] = useState();

    useEffect(() => {
      const userRef = firebase.database().ref("Users/");
      const onValueChange = function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          const userId = childData.userId;
          if (userId === user.uid) {
            capitalizeName(childData.name)
          };
        });
      }

      if (user) {
        function getUsername() {
            userRef.on("value", onValueChange)
          }
          getUsername();
      }

      return () => {
        userRef.off("value", onValueChange);
      }
      
    }, [user])

      function capitalizeName(name) {
        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
        setName(capitalizedName);
      }


    return (
        <div className={styles.dashboard}>  
            {name && 
            <form onSubmit={signOut} className={styles.form}>
                <h1 className={styles.heading}>{name}, you're now logged in!</h1>
                <h2 className={styles.subheading}>There's nothing to see quite yet. But stay tuned, I'm building an exciting chat app.</h2>
                <button className={styles.signOut}>Sign out</button>
            </form>
            } 
        </div>
    )
}

export default Dashboard