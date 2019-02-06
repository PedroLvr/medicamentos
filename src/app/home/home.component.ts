import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RemedioService } from '../remedio.service';
import { Subject, Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { ParamsService } from '../params.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild('heroBody') heroBody: ElementRef;
    autocompletes: Array<any> = [];

    remedios = [];
    busca = "";

    startAt = new Subject();
    endAt = new Subject();
    startobs = this.startAt.asObservable();
    endobs = this.endAt.asObservable();

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _remedioService: RemedioService,
        private _db: AngularFireDatabase,
        private _params: ParamsService
    ) {
        this._route.queryParamMap.subscribe(res => {
            if (res.has('busca')) {
                this.busca = res.get("busca");
            }
        })
    }

    ngOnInit() {
        if (this.busca) {
            this._db.list('/remedios', ref =>
                ref.orderByChild('index')
                    .startAt(this.busca)
                    .endAt(this.busca + "\uf8ff")
            )
                .valueChanges()
                .subscribe(res => {
                    this.remedios = res;
                });
        } else {
            this._db.list("/remedios", ref => ref.limitToFirst(12))
                .valueChanges()
                .subscribe(res => {
                    this.remedios = res;
                });
        }

        Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
            this._remedioService.filtrar(value[0], value[1])
                .valueChanges()
                .subscribe(res => {
                    console.log(res);
                    this.autocompletes = res;
                }, err => {
                    this.autocompletes = [];
                })
        });
    }

    escolher(remedio): void {
        this._params.set(remedio);
        this._router.navigate(['/remedio', remedio.id]);
    }

    autocompletar(event) {
        let value = event.target.value;
        if (value != '') {
            this.startAt.next(value);
            this.endAt.next(value + '\uf8ff');
        } else {
            this.autocompletes = [];
        }
    }

    buscar(busca: string) {
        this._router.navigate([''], {
            relativeTo: this._route,
            queryParams: {
                busca: busca
            }
        }).then(res => {
            window.location.reload();
        })
    }

}
