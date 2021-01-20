import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// measurementID is only required in production environment
if (process.env.REACT_APP_FIREBASE_MEASUREMENT_ID !== "None") {
  config.measurementId = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;
}

const app = firebase.initializeApp(config);

export const auth = app.auth();
export default app;
