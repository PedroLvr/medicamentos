import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-remedio',
    templateUrl: './remedio.component.html',
    styleUrls: ['./remedio.component.scss']
})
export class RemedioComponent implements OnInit {

    remedio: Observable<any>;
    farmacias = [
        {id: 1, nome: "Farmácia 1", telefone: "(95) 3624-1234", endereco: "Av. Sebastião Diniz, n 23"},
        {id: 2, nome: "Farmácia 2", telefone: "(95) 3624-1234", endereco: "Av. Sebastião Diniz, n 23"},
        {id: 2, nome: "Farmácia 2", telefone: "(95) 3624-1234", endereco: "Av. Sebastião Diniz, n 23"},
        {id: 2, nome: "Farmácia 2", telefone: "(95) 3624-1234", endereco: "Av. Sebastião Diniz, n 23"},
        {id: 2, nome: "Farmácia 2", telefone: "(95) 3624-1234", endereco: "Av. Sebastião Diniz, n 23"},
        {id: 2, nome: "Farmácia 2", telefone: "(95) 3624-1234", endereco: "Av. Sebastião Diniz, n 23"},
        {id: 3, nome: "Farmácia 3", telefone: "(95) 3624-1234", endereco: "Av. Sebastião Diniz, n 23"},
        {id: 4, nome: "Farmácia 4", telefone: "(95) 3624-1234", endereco: "Av. Sebastião Diniz, n 23"}
    ];

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        let idRemedio = +this._route.snapshot.paramMap.get('idRemedio');
        this.remedio = this._db.object("remedios/" + idRemedio).valueChanges();
    }

    ngOnInit() { }

    escolher(idFarmacia: number): void {
        this._router.navigate(['farmacia/', idFarmacia]);
    }

    home(): void {
        this._router.navigate(['/']);
    }

}
