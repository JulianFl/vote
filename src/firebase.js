import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBROjxcEU9qfWldIKIhxdgc89fPcm6wiTs",
    authDomain: "vote-b2802.firebaseapp.com",
    projectId: "vote-b2802",
    storageBucket: "vote-b2802.appspot.com",
    messagingSenderId: "428865978560",
    appId: "1:428865978560:web:cbdeba9d1ab381378b2d25"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;