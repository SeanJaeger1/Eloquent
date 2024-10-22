import { User } from 'firebase/auth'
import { updateDoc, doc, Firestore } from 'firebase/firestore'

import { auth, db } from '../firebaseConfig'

type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

const useSetSkillLevel = async (skillLevel: SkillLevel): Promise<void> => {
  const user: User | null = auth.currentUser

  try {
    if (!user?.uid) {
      throw new Error('User is not authenticated.')
    }

    const userRef = doc(db as Firestore, 'users', user.uid)
    await updateDoc(userRef, {
      skillLevel,
    })
  } catch (error) {
    console.error(
      'Error updating skill level: ',
      error instanceof Error ? error.message : String(error)
    )
  }
}

export default useSetSkillLevel
