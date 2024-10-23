import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getFunctions } from '@firebase/functions'
import Constants from 'expo-constants'

interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
}

const firebaseConfig = Constants.expoConfig?.extra?.firebaseConfig as FirebaseConfig

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const functions = getFunctions(app, 'europe-west1')
const db = getFirestore(app)

export { auth, functions, db }
