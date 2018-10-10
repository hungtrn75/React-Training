import firebase from "firebase/app";
import "firebase/storage";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCdeiQHkEsBDDxMQh9rFarKPz3dBUsHFPE",
  authDomain: "u-survey-a4512.firebaseapp.com",
  databaseURL: "https://u-survey-a4512.firebaseio.com",
  projectId: "u-survey-a4512",
  storageBucket: "u-survey-a4512.appspot.com",
  messagingSenderId: "130535044921"
};
firebase.initializeApp(config);

export default firebase;
