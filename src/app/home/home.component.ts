import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RemedioService } from '../remedio.service';
import { Subject, Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild('heroBody') heroBody: ElementRef;
    autocompletes: Array<any> = [];

    startAt = new Subject();
    endAt = new Subject();
    startobs = this.startAt.asObservable();
    endobs = this.endAt.asObservable();

    constructor(
        public router: Router,
        private _remedioService: RemedioService
    ) { }

    ngOnInit() {
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
        this.router.navigate(['busca'], {
            queryParams: {
                b: busca
            }
        });
    }

}
