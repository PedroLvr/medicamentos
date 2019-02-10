import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { SessaoService } from '../sessao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamsService } from '../params.service';
import { RemedioService } from '../remedio.service';

@Component({
    selector: 'app-farmacia',
    templateUrl: './farmacia.component.html',
    styles: [`
        #table-remedios {
            margin: 5px 0 15px;
        }
        .container {
            margin-top: 15px;
            margin-bottom: 15px;
        }
    `]
})
export class FarmaciaComponent implements OnInit {

    isLoading: boolean = false;

    usuario = {};
    farmacias: any = [];
    farmaciaSelecionada = null;
    todosRemedios = [];
    remedios = [];
    totalPages = 0;
    pages = [0];
    currentPage = 1;

    constructor(
        private _remedioService: RemedioService,
        private _db: AngularFireDatabase,
        private _sessao: SessaoService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _params: ParamsService
    ) { }

    ngOnInit() {
        if(this._sessao.hasSessao()) {
            this.usuario = this._sessao.getUser();
            if(this.usuario['farmacias']) {
                this._db.list('/farmacias').valueChanges().first().subscribe(farmacias => {
                    this.farmacias = farmacias.filter(f => this.usuario['farmacias'].includes(f['id']));
                    this.farmacias.unshift({nome: 'Selecione a Farmácia'});
                });
            }
            
            this.pesquisar();
        } else {
            this._sessao.logout();
            this._router.navigate(['/login']);
        }
    }

    pesquisar(event?) {
        let texto = event ? event.target.value.trim() : '';
        this.isLoading = true;
        this._remedioService.getRemedios(texto)
        .valueChanges()
        .subscribe(remedios => {
            this.todosRemedios = remedios;
            if(!!this.farmaciaSelecionada) {
                this.escolherFarmacia({
                    target: {
                        value: this.farmaciaSelecionada['id']
                    }
                });
            }
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
        });
    }

    toggleDisponivel(remedio) {
        if(!this.farmaciaSelecionada['remedios']) {
            this.farmaciaSelecionada['remedios'] = [];
            this.farmaciaSelecionada['remedios'].push(remedio['id']);
        } else if(this.farmaciaSelecionada['remedios'].indexOf(remedio['id']) > -1) {
            let index = this.farmaciaSelecionada['remedios'].indexOf(remedio['id']);
            this.farmaciaSelecionada['remedios'].splice(index, 1);
        } else {
            this.farmaciaSelecionada['remedios'].push(remedio['id']);
        }

        this._db.list('/farmacias').update(this.farmaciaSelecionada['id'], this.farmaciaSelecionada);
    }

    editarRemedios() {
        if(!!this.farmaciaSelecionada) {
            this._params.set(this.farmaciaSelecionada);
            this._router.navigate(['remedios'], { relativeTo: this._route });
        }
    }

    escolherFarmacia(event) {
        let farmacia = this.farmacias.find(f => f.id == event.target.value);
        this.farmaciaSelecionada = farmacia;
        this.remedios = this.todosRemedios.filter(r => r['farmacias'] && r['farmacias'].includes(this.farmaciaSelecionada['id']));
        let len = this.remedios.length;
        this.currentPage = 1;
        this.totalPages = Math.ceil(len / 20);
        this.pages = [];
        for(let i = 1; i <= this.totalPages; i++) {
            this.pages.push(i);
        }
    }

    ir(page) {
        this.currentPage = page;
        this.remedios = this.todosRemedios.slice(20 * (page - 1), 19 + (20 * (page - 1)));
    }

    anterior() {
        this.ir(this.currentPage - 1);
    }

    proximo() {
        this.ir(this.currentPage + 1);
    }

}
