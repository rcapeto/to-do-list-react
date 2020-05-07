import React, { useState } from 'react';
import Routes from './routes';
import './global.css';
import firebase from './firebase';

function App() {

  firebase.isInitialiazed().then(result =>{
    setFirebaseInitialized(result);
  });
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  return firebaseInitialized !== false ? (<Routes/>) : (<h1>Carregando...</h1>)
}

export default App;
