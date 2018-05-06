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
    farmacias: Observable<any[]>;

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        let idRemedio = +this._route.snapshot.paramMap.get('idRemedio');
        this.remedio = this._db.object("remedios/" + idRemedio).valueChanges();
        this.remedio.subscribe(a => {
            console.log(a);
        })
        console.log(this.remedio);
    }

    ngOnInit() { }

    parse(a) {
        return JSON.stringify(a);
    }

    public escolher(idFarmacia: number): void {
        this._router.navigate(['farmacia/', idFarmacia]);
    }

}
