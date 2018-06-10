import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RemedioComponent } from './remedio/remedio.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';
import { ListaRemediosComponent } from './lista-remedios/lista-remedios.component';
import { ListaFarmaciasComponent } from './lista-farmacias/lista-farmacias.component';
import { RelacionarFarmaciasComponent } from './relacionar-farmacias/relacionar-farmacias.component';
import { FormularioRemedioComponent } from './formulario-remedio/formulario-remedio.component';
import { FormularioFarmaciaComponent } from './formulario-farmacia/formulario-farmacia.component';
import { LoginComponent } from './login/login.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { PainelControleComponent } from './painel-controle/painel-controle.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'remedios', component: ListaRemediosComponent },
    { path: 'remedios/formulario', component: FormularioRemedioComponent },
    { path: 'farmacias', component: ListaFarmaciasComponent },
    { path: 'farmacias/formulario', component: FormularioFarmaciaComponent },
    { path: 'painel-controle', component: PainelControleComponent, children: [
        { path: '', redirectTo: 'remedios', pathMatch: 'prefix' },
        { path: 'remedios', component: ListaRemediosComponent },
        { path: 'farmacias', component: ListaFarmaciasComponent },
        { path: 'usuarios', component: ListaUsuariosComponent }
    ] },
    { path: 'relacionar-farmacias', component: RelacionarFarmaciasComponent },
    { path: 'login', component: LoginComponent },
    { path: 'quem-somos', component: QuemSomosComponent },
    // { path: 'farmacia/:idFarmacia', component: FarmaciaComponent }
    // { path: 'erro404', component: Erro404Component },
    // { path: 'atividades', component: AtividadesComponent },
    // { path: 'atividades/:idAtividade', component: AtividadeDetalhesContainer, children: [
    //     { path: '', component: AtividadeInfoContainer },
    //     { path: 'ticket', component: AtividadeTicketContainer },
    // ] },
    // { path: '', redirectTo: '/atividades', pathMatch: 'full' },
    // { path: ':idAtividade', redirectTo: '/atividades/:idAtividade', pathMatch: 'full' },
    // { path: ':idAtividade/pagamento', redirectTo: '/atividades/:idAtividade/pagamento', pathMatch: 'full' },
    // { path: ':idAtividade/impressao', redirectTo: '/atividades/:idAtividade/impressao', pathMatch: 'full' },
    // { path: '**', redirectTo: '/erro404', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRouting {}