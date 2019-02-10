import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { ParamsService } from '../params.service';
import { FarmaciaService } from '../farmacia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessaoService } from '../sessao.service';

@Component({
    selector: 'app-relacao-farmacia-usuario',
    templateUrl: './relacao-farmacia-usuario.component.html',
    styles: [`
        #table-farmacias {
            margin: 5px 0 15px;
        }
        .hero-body {
            padding: 1.5rem .8rem;
        }
        .pagination-link.is-current {
            background: #f26522;
            border-color: #f26522;
        }
    `]
})
export class RelacaoFarmaciaUsuarioComponent implements OnInit {

    isLoading: boolean = false;

    usuario: any = {};
    farmacias = [];
    todasFarmacias = [];
    totalPages = 0;
    pages = [0];
    currentPage = 1;

    constructor(
        private _farmaciaService: FarmaciaService,
        private _db: AngularFireDatabase,
        private _location: Location,
        private _params: ParamsService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _sessao: SessaoService
    ) {
        this.usuario = this._params.getAll();
        if(Object.keys(this.usuario).length === 0) {
            this.usuarios();
        }
    }

    ngOnInit() {
        this.pesquisar();
    }

    pesquisar(event?): void {
        let texto = event ? event.target.value.trim() : '';
        this.isLoading = true;
        this._farmaciaService.getFarmacias(texto.toLowerCase())
        .valueChanges()
        .subscribe(farmacias => {
            this.todasFarmacias = farmacias;
            let len = farmacias.length;
            this.currentPage = 1;
            this.totalPages = Math.ceil(len / 20);
            this.pages = [];
            for(let i = 1; i <= this.totalPages; i++) {
                this.pages.push(i);
            }
            this.farmacias = this.todasFarmacias.slice(0, 19);
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
        });
    }

    voltar() {
        this._params.destroy();
        this._location.back();
    }

    usuarios(): void {
        this._router.navigate(['../'], {relativeTo: this._route});
    }

    toggleColaborador(farmacia) {
        let existe = false;
        let index = -1;

        if (this.usuario.hasOwnProperty('farmacias')) {
            this.usuario['farmacias'].forEach((idFarmacia, i) => {
                if (farmacia.id == idFarmacia) {
                    existe = true;
                    index = i;
                }
            });
        }

        if (existe) {
            this.usuario['farmacias'].splice(index, 1);
        } else {
            if (!this.usuario.hasOwnProperty('farmacias')) this.usuario['farmacias'] = [];
            this.usuario['farmacias'].push(farmacia.id);
        }

        this._db.list('/usuarios').update(this.usuario['id'], this.usuario);
        this._sessao.login(this.usuario);
    }

    ir(page) {
        this.currentPage = page;
        this.farmacias = this.todasFarmacias.slice(20 * (page - 1), 19 + (20 * (page - 1)));
    }

    anterior() {
        this.ir(this.currentPage - 1);
    }

    proximo() {
        this.ir(this.currentPage + 1);
    }

}
