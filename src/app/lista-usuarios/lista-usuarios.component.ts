import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { PopupService } from '../popup/popup.service';
import { ParamsService } from '../params.service';
import { UsuarioService } from '../usuario.service';

@Component({
    selector: 'app-lista-usuarios',
    templateUrl: './lista-usuarios.component.html',
    styles: [`
        #table-usuarios {
            margin: 5px 0 15px;
        }
        .pagination-link.is-current {
            background: #f26522;
            border-color: #f26522;
        }
    `]
})
export class ListaUsuariosComponent implements OnInit {

    isLoading: boolean = false;

    usuarios = [];
    todosUsuarios = [];
    totalPages = 0;
    pages = [0];
    currentPage = 1;

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router,
        private _route: ActivatedRoute,
        private _popup: PopupService,
        private _params: ParamsService,
        private _usuarioService: UsuarioService
    ) { }

    ngOnInit() {
        this.pesquisar();
    }

    novoUsuario() {
        this._router.navigate(['formulario'], { relativeTo: this._route });
    }

    pesquisar(event?): void {
        let texto = event ? event.target.value.trim() : '';
        this.isLoading = true;
        this._usuarioService.getUsuarios(texto)
        .valueChanges()
        .subscribe(usuarios => {
            this.todosUsuarios = usuarios;
            let len = usuarios.length;
            this.currentPage = 1;
            this.totalPages = Math.ceil(len / 20);
            this.pages = [];
            for(let i = 1; i <= this.totalPages; i++) {
                this.pages.push(i);
            }
            this.usuarios = this.todosUsuarios.slice(0, 19);
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
        });
    }

    editarFarmacias(usuario) {
        this._params.set(usuario);
        this._router.navigate(['farmacias'], { relativeTo: this._route });
    }

    editarUsuario(usuario) {
        this._params.set(usuario);
        this.novoUsuario();
    }

    excluirUsuario(usuario) {
        this._popup.confirm({
            titulo: 'Atenção!',
            texto: 'Tem certeza que deseja excluir "' + usuario.nome + '"?'
        }).onFechar.subscribe(res => {
            if(res.res) {
                this._db.list('/usuarios').remove(usuario.id);
            }
        });
    }

    ir(page) {
        this.currentPage = page;
        this.usuarios = this.todosUsuarios.slice(20 * (page - 1), 19 + (20 * (page - 1)));
    }

    anterior() {
        this.ir(this.currentPage - 1);
    }

    proximo() {
        this.ir(this.currentPage + 1);
    }

}
