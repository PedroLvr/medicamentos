import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SessaoService } from '../sessao.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    usuario: object = null;
    menuAtivo: boolean = false;

    constructor(
        private _sessao: SessaoService,
        private _router: Router
    ) {}

    ngOnInit() {
        this._sessao.hasSessao
        .subscribe(usuario => {
            this.usuario = usuario;
        })
    }

    toggleMenu() {
        this.menuAtivo = !this.menuAtivo;
    }

    logout() {
        this._sessao.logout();
        this._router.navigate(['/']);
        this.toggleMenu();
    }
}
