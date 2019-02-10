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

    isLoading: boolean = false;

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
            this.isLoading = true;
            this._db.list('/remedios', ref =>
                ref.orderByChild('index')
                    .startAt(this.busca.toLocaleLowerCase())
                    .endAt(this.busca.toLocaleLowerCase() + "\uf8ff")
            )
                .valueChanges()
                .subscribe(res => {
                    this.isLoading = false;
                    this.remedios = res;
                }, err => {
                    this.isLoading = false;
                });
        } else {
            this.isLoading = true;
            this._db.list("/remedios", ref => ref.limitToFirst(12))
                .valueChanges()
                .subscribe(res => {
                    this.isLoading = false;
                    this.remedios = res;
                }, err => {
                    this.isLoading = false;
                });
        }

        Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
            this.isLoading = true;
            this._remedioService.filtrar(value[0], value[1])
                .valueChanges()
                .subscribe(res => {
                    this.isLoading = false;
                    this.autocompletes = res;
                }, err => {
                    this.isLoading = false;
                    this.autocompletes = [];
                });
        });
    }

    escolher(remedio): void {
        this._params.set(remedio);
        this._router.navigate(['/remedio', remedio.id]);
    }

    autocompletar(event) {
        let value = event.target.value;
        if (value != '') {
            this.startAt.next(value.toLocaleLowerCase());
            this.endAt.next(value.toLocaleLowerCase() + '\uf8ff');
        } else {
            this.autocompletes = [];
        }
    }

    buscar(busca: string) {
        this._router.navigate([''], {
            relativeTo: this._route,
            queryParams: {
                busca: busca['nome']
            }
        }).then(res => {
            window.location.reload();
        })
    }

}
