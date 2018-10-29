import { Component, OnInit } from '@angular/core';
import { SessaoService } from '../sessao.service';
import { LoadingService } from '../loading/loading.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-painel-controle',
    templateUrl: './painel-controle.component.html'
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
