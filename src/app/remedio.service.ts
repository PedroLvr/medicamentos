import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class RemedioService {

    constructor(private _db: AngularFireDatabase) { }

    getRemedios(busca = ''): AngularFireList<any> {
        return this._db.list('/remedios', ref =>
            ref.orderByChild('nome')
            .startAt(busca)
            .endAt(busca + "\uf8ff")
        );
    }

    removeRemedio(key): void {
        this._db.list('/remedios').remove(key);
    }

    notificar(idRemedio, email, telefone) {
        this._db.list('/notificacoes').push({
            idRemedio: idRemedio,
            email: email,
            telefone: telefone
        });
    }

}