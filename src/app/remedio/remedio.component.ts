import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamsService } from '../params.service';
import { RemedioService } from '../remedio.service';
import { FarmaciaService } from '../farmacia.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { PopupService } from '../popup/popup.service';

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
            this.farmacias = farmacias;
            this.farmaciasDisponiveis = farmacias.reduce((total, farmacia) => farmacia.remedios && farmacia.remedios.indexOf(this.remedio.id) ? ++total : total, 0);
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
            this._remedioService.notificar(this.remedio.id, formulario.email, formulario.telefone);
            this.formularioNotificar.reset();
            this._popup.alert({
                titulo: 'Solicitação Enviada',
                texto: 'Você será notificado assim que o remédio estiver disponível em alguma farmácia.'
            });
        }
    }

    home(): void {
        this._router.navigate(['/']);
    }

}
