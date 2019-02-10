import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamsService } from '../params.service';
import { RemedioService } from '../remedio.service';
import { FarmaciaService } from '../farmacia.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PopupService } from '../popup/popup.service';
import { PushNotification } from '../push-notification.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-remedio',
    templateUrl: './remedio.component.html'
})
export class RemedioComponent implements OnInit {

    remedioId;
    remedio = null;
    farmacias = [];
    farmaciasDisponiveis = 0;
    formularioNotificar: FormGroup;
    isLoading: boolean = false;

    subFarmacia: Subscription;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _remedioService: RemedioService,
        private _farmaciaService: FarmaciaService,
        private _push: PushNotification,
        private _popup: PopupService,
        private _params: ParamsService,
        private _db: AngularFireDatabase
    ) {
        this.remedio = this._params.getAll();
        if(Object.keys(this.remedio).length === 0) {
            this._route.params.subscribe(params => {
                if(!params.hasOwnProperty('id')) {
                    this.home();
                } else {
                    this._db.object('/remedios/' + params['id'])
                    .valueChanges()
                    .subscribe(remedio => {
                        this.remedio = remedio;

                        this.getFarmacias();
                    });
                }
            });
        }
    }

    ngOnInit() {
        this.getFarmacias();
        this.formularioNotificar = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'telefone': new FormControl('', Validators.required)
        });
    }

    getFarmacias() {
        this.isLoading = true;

        if(!!this.subFarmacia) {
            this.subFarmacia.unsubscribe();
        }

        this.subFarmacia
        this.subFarmacia = this._farmaciaService.getFarmacias()
        .valueChanges()
        .subscribe(farmacias => {
            if(this.remedio['farmacias']) {
                this.farmacias = farmacias.filter(farmacia => this.remedio['farmacias'].indexOf(farmacia.id) > -1);
                this.farmaciasDisponiveis = this.farmacias.reduce((total, farmacia) => farmacia.remedios && (farmacia.remedios.indexOf(this.remedio.id) >= 0) ? ++total : total, 0);
            }
            this.isLoading = false;
        }, err => {
            console.log(err);
            this.farmacias = null;
            this.isLoading = false;
        });
    }

    notificar() {
        this.formularioNotificar.updateValueAndValidity();
        if(this.formularioNotificar.valid) {
            const formulario = this.formularioNotificar.value;
            this._push.run().then(() => {
                this.enviarNotificacao(formulario);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    enviarNotificacao(formulario) {
        this._remedioService.notificar(
            this.remedio.id,
            this.remedio.nome,
            formulario.email,
            formulario.telefone,
            this._push.token
        );
        this.formularioNotificar.reset();
        this._popup.alert({
            titulo: 'Solicitação Enviada',
            texto: 'Você será notificado assim que o remédio estiver disponível em alguma farmácia.'
        });
    }

    home(): void {
        this._router.navigate(['/']);
    }

}
