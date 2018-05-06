import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';
import { RemedioComponent } from './remedio/remedio.component';
import { FooterComponent } from './footer/footer.component';

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
        RemedioComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AppRouting
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
