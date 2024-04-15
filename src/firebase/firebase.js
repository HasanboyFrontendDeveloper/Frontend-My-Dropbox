import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAG1jescpB9YtR0z1gM_8vDsydOxcAdhcE",
  authDomain: "dropbox-bcf2e.firebaseapp.com",
  projectId: "dropbox-bcf2e",
  storageBucket: "dropbox-bcf2e.appspot.com",
  messagingSenderId: "790847939236",
  appId: "1:790847939236:web:c1e2f737fc4a29971b3c31",
};

const app = initializeApp(firebaseConfig);
const fileDB = getStorage(app)

export { fileDB };

export default app;
