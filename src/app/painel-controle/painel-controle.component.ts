import { Component, OnInit } from '@angular/core';
import { SessaoService } from '../sessao.service';
import { LoadingService } from '../loading/loading.service';
import { Router } from '@angular/router';

@Component({
    selector: 'painel-controle',
    templateUrl: './painel-controle.component.html',
    styles: [`
        .tabs {
            margin: 15px 0 0 0;
        }

        .tabs li a {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            border: none;
        }
        .tabs li:not(.is-active) a:hover {
            border: none;
            background: #eaeaea;
        }

        .tabs li.is-active a {
            color: #fff;
        }
        .tabs li.is-active a.remedios {
            background-color: #00A1FF;
        }
        .tabs li.is-active a.farmacias {
            background-color: #2edcdc;
        }
        .tabs li.is-active a.usuarios {
            background-color: #f26522;
        }
    `]
})
export class PainelControleComponent implements OnInit {

    usuario = {};

    constructor(
        private _sessao: SessaoService,
        private _loading: LoadingService,
        private _router: Router
    ) { }

    ngOnInit() {
        this._loading.show();
        if(!this._sessao.hasSessao()) {
            console.log("sem sessao")
            this._sessao.logout();
            this._router.navigate(['/login']);
        } else {
            this.usuario = this._sessao.getUser();
        }
        this._loading.hide();
    }

}
