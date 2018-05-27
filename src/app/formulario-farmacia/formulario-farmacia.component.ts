import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../request.service';

@Component({
    selector: 'app-formulario-farmacia',
    templateUrl: './formulario-farmacia.component.html',
    styleUrls: ['./formulario-farmacia.component.scss']
})
export class FormularioFarmaciaComponent implements OnInit {

    farmacia: any = {};
    farmacias: AngularFireList<any>;

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router,
        private _request: RequestService
    ) {
        this.farmacias = this._db.list('farmacias');
    }

    ngOnInit() { }

    pesquisarCep(e) {
        let cep = e.target.value;
        console.log(cep);
        if(cep.length === 8) {
            this._request.get('https://viacep.com.br/ws/'+ cep +'/json/')
            .then(res => {
                console.log(res);
                this.farmacia.endereco = res.logradouro;
                this.farmacia.cidade = res.localidade;
                this.farmacia.bairro = res.bairro;
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    cancelar() { }

    salvar(farmacia) {
        if ('id' in farmacia) {
            // update
        } else {
            let key = this.farmacias.push(farmacia).key;
            this.farmacias.update(key, { id: key });
            this.farmacia = {};
        }
    }
}
