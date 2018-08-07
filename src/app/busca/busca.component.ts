import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { RemedioService } from '../remedio.service';
import { ParamsService } from '../params.service';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {

  remedios = null;

  constructor(
      private _router: Router,
      private _params: ParamsService,
      private _remedioService: RemedioService,
      private _popup: PopupService
  ) {}

  ngOnInit() {
      this.pesquisar();
  }

  escolher(remedio): void {
      this._params.set(remedio);
      this._router.navigateByUrl('remedio');
  }

  pesquisar(event?): void {
      let texto = event ? event.target.value.trim() : '';
      this._remedioService.getRemedios(texto)
      .valueChanges()
      .subscribe(remedios => {
          this.remedios = remedios;
      }, err => {
          console.log(err);
          this.remedios = null;
      });
  }

}
