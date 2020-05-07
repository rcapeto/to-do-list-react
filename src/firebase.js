import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyCbOIUdvp9n_AOGmfrsWrLDdnwLr_0KFtI",
    authDomain: "to-do-list-bed70.firebaseapp.com",
    databaseURL: "https://to-do-list-bed70.firebaseio.com",
    projectId: "to-do-list-bed70",
    storageBucket: "to-do-list-bed70.appspot.com",
    messagingSenderId: "639809045261",
    appId: "1:639809045261:web:d301b9a7f26ecae080e644"
  };

class Firebase{
    constructor(){
        if(firebase.apps.length === 0){
            firebase.initializeApp(firebaseConfig);
        }
        this.database = firebase.database();
    }
    isInitialiazed(){
        return new Promise(resolve =>{
            firebase.auth().onAuthStateChanged(resolve);
        });
    }

    login(email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    logout(){
        return firebase.auth().signOut();
    }

    async register(name, email, password){
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        const uid = firebase.auth().currentUser.uid;

       return firebase.database().ref('users').child(uid).set({
            name,
            email
        });
    }

    getCurrent(){
        return firebase.auth().currentUser && firebase.auth().currentUser.email;    
    }

    async getUsername(callback){
        if(!firebase.auth().currentUser){
            return null;
        }

        const uid = firebase.auth().currentUser.uid;

        await firebase.database().ref('users').child(uid).once('value').then(callback);
    }
}

export default new Firebase();