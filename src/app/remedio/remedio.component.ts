import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamsService } from '../params.service';
import { RemedioService } from '../remedio.service';
import { FarmaciaService } from '../farmacia.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PopupService } from '../popup/popup.service';
import { PushNotification } from '../push-notification.service';

@Component({
    selector: 'app-remedio',
    templateUrl: './remedio.component.html',
    styleUrls: ['./remedio.component.scss']
})
export class RemedioComponent implements OnInit {

    remedio;
    farmacias = null;
    farmaciasDisponiveis = 0;
    formularioNotificar: FormGroup;
    isLoading: boolean = false;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _remedioService: RemedioService,
        private _farmaciaService: FarmaciaService,
        private _push: PushNotification,
        private _popup: PopupService,
        private _params: ParamsService
    ) {
        this.remedio = this._params.getAll();
        if(Object.keys(this.remedio).length === 0) {
            this.home();
        }
    }

    ngOnInit() {
        this._farmaciaService.getFarmacias()
        .valueChanges()
        .subscribe(farmacias => {
            if(this.remedio['farmacias']) {
                this.farmacias = farmacias.filter(farmacia => this.remedio['farmacias'].indexOf(farmacia.id) > -1);
                this.farmaciasDisponiveis = this.farmacias.reduce((total, farmacia) => farmacia.remedios && farmacia.remedios.indexOf(this.remedio.id) ? ++total : total, 0);
            }
        }, err => {
            console.log(err);
            this.farmacias = null;
        });

        this.formularioNotificar = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'telefone': new FormControl('', Validators.required)
        });
    }

    notificar() {
        this.formularioNotificar.updateValueAndValidity();
        if(this.formularioNotificar.valid) {
            const formulario = this.formularioNotificar.value;
            if(this._push.hasToken) {
                console.log('ja tem token de notificacao')
                this._remedioService.notificar(
                    this.remedio.id,
                    formulario.email,
                    formulario.telefone,
                    this._push.token.token
                );
                this.formularioNotificar.reset();
                this._popup.alert({
                    titulo: 'Solicitação Enviada',
                    texto: 'Você será notificado assim que o remédio estiver disponível em alguma farmácia.'
                });
            } else {
                console.log('nao tem token de notificacao')
                this._push.askPermission().then(() => {
                    console.log("Usuario permitiu!");
                    return this._push.askToken();
                }, err => {
                    console.log(err);
                    console.log('usuario nao permitiu');
                }).then(token => {
                    return this._push.saveToken(token);
                }).then(res => {
                    console.log(res);
                    this._remedioService.notificar(
                        this.remedio.id,
                        formulario.email,
                        formulario.telefone,
                        this._push.token.token
                    );
                    this.formularioNotificar.reset();
                    this._popup.alert({
                        titulo: 'Solicitação Enviada',
                        texto: 'Você será notificado assim que o remédio estiver disponível em alguma farmácia.'
                    });
                }).catch(err => {
                    console.log(err);
                    this._remedioService.notificar(
                        this.remedio.id,
                        formulario.email,
                        formulario.telefone,
                        null
                    );
                    this.formularioNotificar.reset();
                    this._popup.alert({
                        titulo: 'Solicitação Enviada',
                        texto: 'Você será notificado assim que o remédio estiver disponível em alguma farmácia.'
                    });
                })
            }
        }
    }

    home(): void {
        this._router.navigate(['/']);
    }

}
