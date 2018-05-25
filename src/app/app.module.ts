import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';
import { RemedioComponent } from './remedio/remedio.component';
import { FooterComponent } from './footer/footer.component';
import { ListaRemediosComponent } from './lista-remedios/lista-remedios.component';
import { FormularioRemedioComponent } from './formulario-remedio/formulario-remedio.component';

import { RemedioService } from './remedio.service';

import { AppRouting } from './app.routing';
import { firebaseConfig } from './app.firebase';

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
        FormularioRemedioComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AppRouting
    ],
    providers: [ RemedioService ],
    bootstrap: [AppComponent]
})
export class AppModule { }
