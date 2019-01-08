import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class UsuarioService {

    constructor(private _db: AngularFireDatabase) { }

    getUsuarios(busca = ''): AngularFireList<any> {
        return this._db.list('/usuarios', ref =>
            ref.orderByChild('index')
                .startAt(busca)
                .endAt(busca + "\uf8ff")
        );
    }

    removeUsuario(key): void {
        this._db.list('/usuarios').remove(key);
    }

}
