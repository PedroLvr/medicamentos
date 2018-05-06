import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    remedios: Observable<any[]>;

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router
    ) {
        this.remedios = this._db.list('remedios').valueChanges();
    }

    ngOnInit() {}

    public escolher(idRemedio): void {
        this._router.navigate(['/', idRemedio - 1]);
    }

    public pesquisar(texto: string): void {
        let t = texto.toString().toLowerCase().trim();
        console.log(t);
    }

}
