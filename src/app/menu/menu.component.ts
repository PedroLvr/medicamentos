import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SessaoService } from '../sessao.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

    usuario: object = null;
    menuAtivo: boolean = false;

    constructor(
        private _sessao: SessaoService,
        private _router: Router
    ) {}

    ngOnInit() {
        if(this._sessao.hasSessao()) {
            this.usuario = this._sessao.getUser();
        }
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
