import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList,  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-formulario-remedio',
    templateUrl: './formulario-remedio.component.html',
    styleUrls: ['./formulario-remedio.component.scss']
})
export class FormularioRemedioComponent implements OnInit {

    remedio: any = {};
    remedios: AngularFireList<any>;

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router
    ) {
        this.remedios = this._db.list('remedios');
    }

    ngOnInit() {}

    cancelar() {}

    salvar(remedio) {
        if('id' in remedio) {
            // update
        } else {
            let key = this.remedios.push(remedio).key;
            this.remedios.update(key, {id: key})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
            this.remedio = {};
        }
    }

}
