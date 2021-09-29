import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDEdQT6X3dR6uzwzwcVbSwiEwh-wYknZOs",
  authDomain: "ecobingo-corpochivor.firebaseapp.com",
  projectId: "ecobingo-corpochivor",
  storageBucket: "ecobingo-corpochivor.appspot.com",
  messagingSenderId: "959928311446",
  appId: "1:959928311446:web:a6fa1e69f3c5ee2004ecb7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

async function connect({room, name}){

  let roomCollection = firestore.collection(room);
  let userDocument = roomCollection.doc();
  let roomDocument = roomCollection.doc(room);

  userDocument.set({ name });

  let targetResolve;
  let cardResolve;

  let targetPromise = new Promise(resolve => {targetResolve = resolve;})
  let cardPromise = new Promise(resolve => {cardResolve = resolve;})

  roomDocument.onSnapshot((snapshot) => {
    const data = snapshot.data();
    if(data?.target) {
      targetResolve(JSON.parse(data.target));
    }
  });

  let unsubFromSelf = userDocument.onSnapshot((snapshot) => {
    const data = snapshot.data();
    if(data?.card) {
      cardResolve(JSON.parse(data.card));
      unsubFromSelf();
    }
  });

  return Promise.race([
    Promise.all([
      cardPromise,
      targetPromise,
      Promise.resolve(roomDocument),
      Promise.resolve(userDocument)]),
    new Promise((_, reject) => setTimeout(() => reject, 2 * 60 * 1000))
  ]);
}

export {connect};