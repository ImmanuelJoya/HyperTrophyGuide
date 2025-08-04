import { getAnalytics } from "firebase/analytics";   
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOx7tg99iZLh45SFaYXcWER7xDv4oKAco",
    authDomain: "hypertorphyguide.firebaseapp.com",
    projectId: "hypertorphyguide",
    storageBucket: "hypertorphyguide.firebasestorage.app",
    messagingSenderId: "683231866899",
    appId: "1:683231866899:web:133a921cb9eace67fb0fe6",
    measurementId: "G-V1MKJJ752X"
};

// Initialize Firebase
const fireBase = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireBase);
const auth = getAuth(fireBase);

// Sign up function
export async function signUp(email, password) {
    // eslint-disable-next-line no-useless-catch
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
}

// Sign in function
export async function signIn(email, password) {
    // eslint-disable-next-line no-useless-catch
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
}

// Sign out function
export async function signOutUser() {
    // eslint-disable-next-line no-useless-catch
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
}

export { auth };
export default fireBase;
export { analytics };

