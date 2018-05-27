import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

@Injectable()
export class FarmaciaService {

    constructor(private _db: AngularFireDatabase) { }

    getFarmacias(busca = ''): AngularFireList<any> {
        return this._db.list('/farmacias', ref =>
            ref.orderByChild('nome')
            .startAt(busca)
            .endAt(busca + "\uf8ff")
        );
    }

    getFarmacia(key: string): AngularFireObject<any> {
        return this._db.object('/farmacias/' + key);
    }

}