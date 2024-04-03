import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";

let analytics: Analytics;

const firebaseConfig = {
  apiKey: "AIzaSyAZCUu0cpe1nXDzLmZRUJuGAgPrvvYI6e4",
  authDomain: "frameyu-app.firebaseapp.com",
  projectId: "frameyu-app",
  storageBucket: "frameyu-app.appspot.com",
  messagingSenderId: "1062816598333",
  appId: "1:1062816598333:web:dbcdcf42d987477397dd54",
  measurementId: "G-52K2GSE684",
};

const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { analytics };
