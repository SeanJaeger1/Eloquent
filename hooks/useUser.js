import { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribe = null;

    const fetchUser = async () => {
      const usersRef = collection(db, "User");
      const q = query(usersRef, where("email", "==", auth.currentUser.email));

      unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          setUser(doc.data());
        });
      });
    };

    if (auth?.currentUser?.email) {
      fetchUser();
    } else {
      setUser(null);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [auth?.currentUser?.email]);

  return user;
};

export default useUser;
