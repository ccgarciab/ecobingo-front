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

let roomCollection;
let userDocument;
let offerCandidates;
let answerCandidates;

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302',
              'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);
let dataChannel = pc.createDataChannel("Channel");

const dataChannelPromise = new Promise((resolve, reject) => {

  pc.ondatachannel = (e) => {

    dataChannel = e.channel;
    dataChannel.onerror = console.error;
    resolve(dataChannel);
  }
});

async function getDatachannel({room, user}){

  roomCollection = firestore.collection(room);
  userDocument = roomCollection.doc();
  offerCandidates = userDocument.collection("offerCandidates");
  answerCandidates = userDocument.collection('answerCandidates');

  pc.onicecandidate = (e) => {
    e.candidate && offerCandidates.add(e.candidate.toJSON());
  };

  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  userDocument.set({
    room,
    user,
    offer
  });

  userDocument.onSnapshot((snapshot) => {
    const data = snapshot.data();
    if (!pc.currentRemoteDescription && data?.answer) {
      pc.setRemoteDescription(data.answer);
    }
  });

  answerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });

  return Promise.race([
    dataChannelPromise,
    new Promise((_, reject) => setTimeout(reject, 2 * 60 * 1000))
  ]);
}

export {getDatachannel};