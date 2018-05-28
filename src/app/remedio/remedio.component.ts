import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ParamsService } from '../params.service';
import { FarmaciaService } from '../farmacia.service';

@Component({
    selector: 'app-remedio',
    templateUrl: './remedio.component.html',
    styleUrls: ['./remedio.component.scss']
})
export class RemedioComponent implements OnInit {

    remedio;
    farmacias = [];

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router,
        private _route: ActivatedRoute,
        private _farmaciaService: FarmaciaService,
        private _params: ParamsService
    ) {
        this.remedio = this._params.getAll();
        console.log(this.remedio);
    }

    ngOnInit() {
        this._farmaciaService.getFarmacias()
        .valueChanges()
        .subscribe(farmacias => {
            console.log(farmacias);
            this.farmacias = farmacias;
        });
    }

    home(): void {
        this._router.navigate(['/']);
    }

}
