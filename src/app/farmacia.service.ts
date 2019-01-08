import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class FarmaciaService {

    constructor(private _db: AngularFireDatabase) { }

    getFarmacias(busca = ''): AngularFireList<any> {
        return this._db.list('/farmacias', ref =>
            ref.orderByChild('index')
            .startAt(busca)
            .endAt(busca + "\uf8ff")
        );
    }

    removeFarmacia(key): void {
        this._db.list('/farmacias').remove(key);
    }

}