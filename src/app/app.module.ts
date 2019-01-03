import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { PopupModule } from './popup/popup.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';
import { RemedioComponent } from './remedio/remedio.component';
import { FooterComponent } from './footer/footer.component';
import { ListaRemediosComponent } from './lista-remedios/lista-remedios.component';
import { FormularioRemedioComponent } from './formulario-remedio/formulario-remedio.component';
import { FormularioFarmaciaComponent } from './formulario-farmacia/formulario-farmacia.component';
import { FormularioFuncionarioComponent } from './formulario-funcionario/formulario-funcionario.component';
import { ListaFarmaciasComponent } from './lista-farmacias/lista-farmacias.component';
import { RelacionarFarmaciasComponent } from './relacionar-farmacias/relacionar-farmacias.component';
import { LoginComponent } from './login/login.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { PainelControleComponent } from './painel-controle/painel-controle.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { LoadingComponent } from './loading/loading.component';

import { PushNotification } from './push-notification.service';
import { RemedioService } from './remedio.service';
import { FarmaciaService } from './farmacia.service';
import { UsuarioService } from './usuario.service';
import { RequestService } from './request.service';
import { ParamsService } from './params.service';
import { SessaoService } from './sessao.service';
import { LoadingService } from './loading/loading.service';

import { AppRouting } from './app.routing';
import { firebaseConfig } from './app.firebase';
import { BuscaComponent } from './busca/busca.component';
import { RelacaoFarmaciaUsuarioComponent } from './relacao-farmacia-usuario/relacao-farmacia-usuario.component';
import { RelacaoFarmaciaRemedioComponent } from './relacao-farmacia-remedio/relacao-farmacia-remedio.component';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';

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
        QuemSomosComponent,
        PainelControleComponent,
        ListaUsuariosComponent,
        FormularioUsuarioComponent,
        AvaliacaoComponent,
        LoadingComponent,
        BuscaComponent,
        RelacaoFarmaciaUsuarioComponent,
        RelacaoFarmaciaRemedioComponent,
        RedefinirSenhaComponent
    ],
    entryComponents: [
        LoadingComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AppRouting,
        PopupModule
    ],
    providers: [
        RemedioService,
        FarmaciaService,
        UsuarioService,
        RequestService,
        ParamsService,
        PushNotification,
        SessaoService,
        LoadingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
