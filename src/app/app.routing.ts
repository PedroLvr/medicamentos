import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RemedioComponent } from './remedio/remedio.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: ':idRemedio', component: RemedioComponent },
    { path: 'farmacia/:idFarmacia', component: FarmaciaComponent }
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