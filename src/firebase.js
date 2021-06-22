import firebase from "firebase";

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
const db = firebaseApp.firestore();

// eslint-disable-next-line no-restricted-globals
if (location.hostname === 'localhost') {
    // Used to fix issue with Cypress failing to connect to emulator
    //firebase.firestore().settings({ experimentalForceLongPolling: true })
    //db.useEmulator('localhost', 8080);
    //auth().useEmulator('http://localhost:9099/', { disableWarnings: true });
}

export { db, firebaseApp };