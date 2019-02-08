"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({
    databaseURL: 'https://remedios-bv.firebaseio.com/'
});
exports.onRemedioDisponivel = functions.database.ref('/farmacias/{asdf}').onUpdate((snap, context) => {
    const before = snap.before.val();
    const after = snap.after.val();
    if (!before.hasOwnProperty('remedios'))
        before.remedios = [];
    if (!after.hasOwnProperty('remedios'))
        after.remedios = [];
    if (after['remedios'].length > before['remedios'].length) {
        before['remedios'].forEach(remedio => {
            const index = after['remedios'].indexOf(remedio);
            after['remedios'].splice(index, 1);
        });
        const remedioAdicionado = after['remedios'][0];
        console.log("Remedio adicionado: " + remedioAdicionado);
        admin.database()
            .ref('/notificacoes')
            .orderByChild('idRemedio')
            .equalTo(remedioAdicionado)
            .once('value').then(e => {
            console.log(e.val());
            const notificacoes = e.val();
            Object.keys(notificacoes).forEach(key => {
                const token = notificacoes[key].token;
                console.log(token);
                const email = notificacoes[key].email;
                console.log(email);
                const nomeRemedio = notificacoes[key].nomeRemedio;
                if (token) {
                    admin.messaging().sendToDevice(token.token, {
                        "notification": {
                            "title": "Remédio Disponível",
                            "body": "O remédio \"" + nomeRemedio + "\" que você estava esperando já está disponível!",
                            "click_action": "https://remedios-bv.firebaseapp.com/" + remedioAdicionado,
                            "icon": "https://remedios-bv.firebaseapp.com/assets/img/icons/icon-512x512.png"
                        }
                    }).then(res => {
                        console.log("sucesso notificacao: ", res);
                        admin.database().ref('/notificacoes/' + key).remove().then().catch();
                    }).catch(err => {
                        console.log("erro notificacao: ", err);
                    });
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }
});
//# sourceMappingURL=index.js.map