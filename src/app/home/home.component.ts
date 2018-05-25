import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { RemedioService } from '../remedio.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    remedios = [];
    startAt = new Subject();
    endAt = new Subject();

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router,
        private _remedioService: RemedioService
    ) {}

    ngOnInit() {
        this._remedioService.getRemedios('')
        .valueChanges()
        .subscribe(remedios => {
            console.log(remedios);
            this.remedios = remedios;
        });
    }

    escolher(idRemedio): void {
        this._router.navigate(['/', idRemedio]);
    }

    pesquisar(texto: string): void {
      this.startAt.next(texto);
      this.endAt.next(texto + "\uf8ff");
    }

}
