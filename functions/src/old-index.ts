import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as algoliasearch from 'algoliasearch';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const env = functions.config();
admin.initializeApp({
    databaseURL: 'https://remedios-bv.firebaseio.com/'
});

const client = algoliasearch('GIV51TUG9V', '88db7c52c77a029b9f10383b98204986');

const index = client.initIndex('remedios');

exports.onCreateRemedio = functions.database.ref('/remedios').onCreate((snap, context) => {
    const data = snap.val;
    const objectId = snap.key;

    return index.saveObject({
        objectId,
        ...data
    })
});

exports.onDeleteRemedio = functions.database.ref('/remedios/{remedioKey}').onDelete((snap, context) => {
    const objectId = snap.key;

    return index.deleteObject(objectId);
})