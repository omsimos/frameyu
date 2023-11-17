import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";

// eslint-disable-next-line import/no-mutable-exports
let analytics: Analytics;

const app = initializeApp({
  apiKey: "AIzaSyAfJm1qESsqKbIVYqycF9X5jdvz_ZPa3rc",
  authDomain: "framedip.firebaseapp.com",
  projectId: "framedip",
  storageBucket: "framedip.appspot.com",
  messagingSenderId: "147842940918",
  appId: "1:147842940918:web:eb2a7485ce0005022b91d7",
  measurementId: "G-4TM7S6XBHT",
});

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { analytics };
