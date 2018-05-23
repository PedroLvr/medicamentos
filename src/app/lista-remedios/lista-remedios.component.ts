import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-lista-remedios',
    templateUrl: './lista-remedios.component.html',
    styleUrls: ['./lista-remedios.component.scss']
})
export class ListaRemediosComponent implements OnInit {

    remedios: Observable<any[]>;

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router
    ) {
        this.remedios = this._db.list('remedios').valueChanges();
    }

    ngOnInit() {}

    escolher(idRemedio): void {
        this._router.navigate(['/', idRemedio - 1]);
    }

    pesquisar(texto: string): void {
        let t = texto.toString().toLowerCase().trim();
        console.log(t);
    }
    
    remover(remedio) {
        console.log('Tem certeza que deseja remover ' + remedio.nome + '?');
    }

}
