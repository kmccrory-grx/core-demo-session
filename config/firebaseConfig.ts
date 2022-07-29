
import { initializeApp, getApps } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { GoogleAuthProvider, getAuth, setPersistence, signInWithRedirect, inMemoryPersistence } from "firebase/auth";

let firebaseConfig = {
    apiKey: "AIzaSyCE20dxsmI0bP3gQykszvMo4BtJV0gtdys",
    authDomain: "matisse-component-playground.firebaseapp.com",
    databaseURL: "https://matisse-component-playground-default-rtdb.firebaseio.com/",
    projectId: "matisse-component-playground",
    storageBucket: "matisse-component-playground.appspot.com",
    messagingSenderId: "96407753692",
    appId: "1:96407753692:web:2e96268938da33f29a7519",
    measurementId: "G-L7FBSTP49Y"
};


if (!getApps().length) {
    initializeApp(firebaseConfig);
}
export const auth = getAuth();
// setPersistence(auth, inMemoryPersistence)
//     .then(() => {
//         const provider = new GoogleAuthProvider();
//         // In memory persistence will be applied to the signed in Google user
//         // even though the persistence was set to 'none' and a page redirect
//         // occurred.
//         return signInWithRedirect(auth, provider);
//     })
//     .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//     });

export default firebaseConfig;