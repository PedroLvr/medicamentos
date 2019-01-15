import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const env = functions.config();
admin.initializeApp({
    databaseURL: 'https://remedios-bv.firebaseio.com/'
});

exports.onRemedioDisponivel = functions.database.ref('/farmacias/{asdf}').onUpdate((snap, context) => {
    console.log("BEFORE: " + JSON.stringify(snap.before.val()));
    console.log("AFTER: " + JSON.stringify(snap.after.val()));
    let before = snap.before.val();
    let after = snap.after.val();
    console.log('Antes tinha? ' + before.hasOwnProperty('remedios'));

    if(!before.hasOwnProperty('remedios')) before.remedios = [];
    if(!after.hasOwnProperty('remedios')) after.remedios = [];

    try {
        console.log(before['remedios'].length, after['remedios'].length)
    } catch(err){}

    if(after['remedios'].length > before['remedios'].length) {
        before['remedios'].forEach(remedio => {
            let index = after['remedios'].indexOf(remedio);
            after['remedios'].splice(index, 1);
        });

        let remedioAdicionado = after['remedios'][0];
        console.log("Remedio adicionado: " + remedioAdicionado);

        admin.database().ref('/notificacoes').once('value').then(e => {
            console.log(e.val());
            let notificacoes = e.val().filter(notificacao => notificacao.idRemedio == remedioAdicionado);
            
        }).catch(err => {
            console.log(err);
        })
    }
});