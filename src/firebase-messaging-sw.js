importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "1061043647297"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload){
    return self.registration.showNotification({}, {});
});