import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class RemedioService {

    constructor(private _db: AngularFireDatabase) {}

    filtrar(start, end): AngularFireList<any> {
        return this._db.list('/remedios', ref =>
            ref.orderByChild('index')
            .limitToFirst(5)
            .startAt(start)
            .endAt(end)
        );
    }

    getRemedios(busca = ''): AngularFireList<any> {
        return this._db.list('/remedios', ref =>
            ref.orderByChild('index')
            .startAt(busca)
            .endAt(busca + "\uf8ff")
        );
    }

    removeRemedio(key): void {
        this._db.list('/remedios').remove(key);
    }

    notificar(idRemedio, nomeRemedio, email, telefone, token) {
        let notificacao = {
            idRemedio: idRemedio,
            nomeRemedio: nomeRemedio,
            email: email,
            telefone: telefone,
            token: token
        };

        this._db.list('/notificacoes').push(notificacao)
        .then(res => {
            console.log('notificacao registrada com sucesso!');
        }, err => {
            console.log('erro notificacao');
            console.log(err);
        });
    }

}