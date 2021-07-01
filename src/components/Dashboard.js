import firebase from 'firebase';
import { useEffect, useState } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

function Dashboard() {
    const { signOut } = useFirebaseAuth();
    
    const { user } = useFirebaseAuth();

    const [name, setName] = useState();

    useEffect(() => {
        if (user) {
            function getUsername() {
                const userRef = firebase.database().ref("Users/");
          
                userRef.on('value', function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    const userId = childData.userId;
                    if (userId === user.uid) {
                      setName(childData.name)
                    }
                  });
                });
              }

            getUsername();
        }
    }, [user])

    return (
        <div>   
           <form onSubmit={signOut}>
               <button>Sign out</button>
               {name && <h1>Hello {name}</h1>}
           </form>
        </div>
    )
}

export default Dashboard