import { Component, OnInit } from '@angular/core';
import { SessaoService } from '../sessao.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    menuAtivo: boolean = false;

    constructor(private _sessao: SessaoService) {}

    ngOnInit() { }

    toggleMenu() {
        this.menuAtivo = !this.menuAtivo;
    }
}
