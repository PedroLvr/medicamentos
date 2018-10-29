import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
    selector: 'app-relacao-farmacia-remedio',
    templateUrl: './relacao-farmacia-remedio.component.html'
})
export class RelacaoFarmaciaRemedioComponent implements OnInit {

    remedios = [];
    remediosRef: AngularFireList<any>;

    constructor(private _db: AngularFireDatabase) {
        this.remediosRef = this._db.list('/remedios', ref => ref.limitToFirst(10));
    }

    ngOnInit() {
        this.remediosRef.valueChanges()
            .subscribe(res => {
                console.log(res);
                this.remedios = res;
            });
    }

    togglePossui(remedio) {
        if(!remedio.farmacias) {
            remedio.farmacias = [];
            remedio.farmacias.push('-LF5m7P2yR5wTYzA3ki9');
        } else if(remedio.farmacias.indexOf('-LF5m7P2yR5wTYzA3ki9') > -1) {
            let index = remedio.farmacias.indexOf('-LF5m7P2yR5wTYzA3ki9');
            remedio.farmacias.splice(index, 1);
        } else {
            remedio.farmacias.push('-LF5m7P2yR5wTYzA3ki9');
        }
        
        this.remediosRef.update(remedio.id, remedio);
    }

}
