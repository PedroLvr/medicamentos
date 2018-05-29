import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { PopupModule } from './popup/popup.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';
import { RemedioComponent } from './remedio/remedio.component';
import { FooterComponent } from './footer/footer.component';
import { ListaRemediosComponent } from './lista-remedios/lista-remedios.component';
import { FormularioRemedioComponent } from './formulario-remedio/formulario-remedio.component';

import { RemedioService } from './remedio.service';
import { FarmaciaService } from './farmacia.service';
import { RequestService } from './request.service';
import { ParamsService } from './params.service';

import { AppRouting } from './app.routing';
import { firebaseConfig } from './app.firebase';
import { FormularioFarmaciaComponent } from './formulario-farmacia/formulario-farmacia.component';
import { FormularioFuncionarioComponent } from './formulario-funcionario/formulario-funcionario.component';
import { ListaFarmaciasComponent } from './lista-farmacias/lista-farmacias.component';
import { RelacionarFarmaciasComponent } from './relacionar-farmacias/relacionar-farmacias.component';
import { LoginComponent } from './login/login.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HomeComponent,
        RemedioComponent,
        FarmaciaComponent,
        MenuComponent,
        RemedioComponent,
        ListaRemediosComponent,
        FormularioRemedioComponent,
        FormularioFarmaciaComponent,
        FormularioFuncionarioComponent,
        ListaFarmaciasComponent,
        RelacionarFarmaciasComponent,
        LoginComponent,
        QuemSomosComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AppRouting,
        PopupModule
    ],
    providers: [
        RemedioService,
        FarmaciaService,
        RequestService,
        ParamsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
