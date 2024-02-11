import { initializeApp } from "@firebase/app"
import { getAuth } from "@firebase/auth"
import { getFunctions } from "@firebase/functions"
import { getFirestore } from "@firebase/firestore"

import Constants from "expo-constants"

const firebaseConfig = Constants.expoConfig.extra.firebaseConfig

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const functions = getFunctions(app, "europe-west1")
const db = getFirestore(app)

export { auth, functions, db }
