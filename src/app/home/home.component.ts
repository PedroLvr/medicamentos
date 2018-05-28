import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { RemedioService } from '../remedio.service';
import { ParamsService } from '../params.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    remedios = [];

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router,
        private _params: ParamsService,
        private _remedioService: RemedioService
    ) {}

    ngOnInit() {
        this.pesquisar();
    }

    escolher(remedio): void {
        this._params.set(remedio);
        this._router.navigateByUrl('remedio');
    }

    pesquisar(texto = ''): void {
        this._remedioService.getRemedios(texto)
        .valueChanges()
        .subscribe(remedios => {
            console.log(remedios);
            this.remedios = remedios;
        });
    }

}
