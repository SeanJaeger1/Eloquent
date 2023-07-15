import { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribe = null;

    const fetchUser = async () => {
      const userRef = doc(db, "users", auth.currentUser.uid);

      unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setUser(doc.data());
        }
      });
    };

    if (auth?.currentUser?.uid) {
      fetchUser();
    } else {
      setUser(null);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [auth?.currentUser?.uid]);

  return user;
};

export default useUser;
