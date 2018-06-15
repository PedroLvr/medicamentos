import { Component, OnInit } from '@angular/core';
import { SessaoService } from '../sessao.service';

@Component({
    selector: 'app-painel-controle',
    templateUrl: './painel-controle.component.html',
    styleUrls: ['./painel-controle.component.scss']
})
export class PainelControleComponent implements OnInit {

    constructor(private _sessao: SessaoService) { }

    ngOnInit() {
        console.log(this._sessao)
        if(!this._sessao.isLogado) {
            
        }
    }

}
