import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};
let app: FirebaseApp | undefined;

export const initializeFirebase = () => {
    if (!app) {
        app = initializeApp(firebaseConfig);
    }
}

export const GetFirebaseAuth = () => {
    if (!app) {
        initializeFirebase();
    }
    return getAuth(app);
}

export const registerUser = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(GetFirebaseAuth(), email, password);
};

export const loginUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(GetFirebaseAuth(), email, password);
};

export const logoutUser = async () => {
    return signOut(GetFirebaseAuth());
};

export const getAuthState = (callback: (user: User | null) => void) => {
    onAuthStateChanged(GetFirebaseAuth(), callback);
};

export const getCurrentUser = () => {
    return GetFirebaseAuth().currentUser;
};