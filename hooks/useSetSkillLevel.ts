import { useCallback } from 'react'

import { updateDoc, doc } from 'firebase/firestore'

import { auth, db } from '../firebaseConfig'

import type { User } from 'firebase/auth'
import type { SkillLevel } from 'types/user'

type SetSkillLevelFunction = (skillLevel: SkillLevel) => Promise<void>

const useSetSkillLevel = (): SetSkillLevelFunction => {
  const setSkillLevel = useCallback(async (skillLevel: SkillLevel): Promise<void> => {
    const user: User | null = auth.currentUser

    try {
      if (!user?.uid) {
        throw new Error('User is not authenticated.')
      }

      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, {
        skillLevel,
      })
    } catch (error) {
      console.error(
        'Error updating skill level: ',
        error instanceof Error ? error.message : String(error)
      )
    }
  }, [])

  return setSkillLevel
}

export default useSetSkillLevel
