import { Component, OnInit } from '@angular/core';
import { SessaoService } from '../sessao.service';
import { LoadingService } from '../loading/loading.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-painel-controle',
    templateUrl: './painel-controle.component.html',
    styleUrls: ['./painel-controle.component.scss']
})
export class PainelControleComponent implements OnInit {

    usuario: object = null;

    constructor(
        private _sessao: SessaoService,
        private _loading: LoadingService,
        private _router: Router
    ) { }

    ngOnInit() {
        console.log("COmecou painel de controle");
        this._loading.show();
        this._sessao.hasSessao
        .subscribe(usuario => {
            console.log(usuario);
            if(usuario) {
                this.usuario = usuario;
            } else {
                this._sessao.logout();
                this._router.navigate(['/login']);
            }
            this._loading.hide();
        })
    }

}
