import { updateDoc, doc } from "firebase/firestore"

import { auth, db } from "../firebaseConfig"

const useSetSkillLevel = async (skillLevel) => {
  const user = auth.currentUser

  try {
    if (!user.uid) {
      throw new Error("User is not authenticated.")
    }

    const userRef = doc(db, "users", user.uid)
    await updateDoc(userRef, {
      skillLevel,
    })

    console.log(`Updated skill level to ${skillLevel}`)
  } catch (error) {
    console.error("Error updating skill level: ", error)
  }
}

export default useSetSkillLevel
