import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BuscaComponent } from './busca/busca.component';
import { RemedioComponent } from './remedio/remedio.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';
import { ListaRemediosComponent } from './lista-remedios/lista-remedios.component';
import { ListaFarmaciasComponent } from './lista-farmacias/lista-farmacias.component';
import { RelacionarFarmaciasComponent } from './relacionar-farmacias/relacionar-farmacias.component';
import { FormularioRemedioComponent } from './formulario-remedio/formulario-remedio.component';
import { FormularioFarmaciaComponent } from './formulario-farmacia/formulario-farmacia.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { RelacaoFarmaciaRemedioComponent } from './relacao-farmacia-remedio/relacao-farmacia-remedio.component';
import { RelacaoFarmaciaUsuarioComponent } from './relacao-farmacia-usuario/relacao-farmacia-usuario.component';
import { LoginComponent } from './login/login.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { PainelControleComponent } from './painel-controle/painel-controle.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'busca', component: BuscaComponent },
    { path: 'remedio', component: RemedioComponent },
    { path: 'controle-remedios', component: FarmaciaComponent},
    { path: 'controle-remedios/remedios', component: RelacaoFarmaciaRemedioComponent },
    { path: 'administracao', component: PainelControleComponent, children: [
        { path: '', redirectTo: 'remedios', pathMatch: 'prefix' },
        { path: 'remedios', component: ListaRemediosComponent },
        { path: 'remedios/formulario', component: FormularioRemedioComponent },

        { path: 'farmacias', component: ListaFarmaciasComponent },
        { path: 'farmacias/formulario', component: FormularioFarmaciaComponent },

        { path: 'usuarios', component: ListaUsuariosComponent },
        { path: 'usuarios/formulario', component: FormularioUsuarioComponent },
        { path: 'usuarios/farmacias', component: RelacaoFarmaciaUsuarioComponent }
    ] },
    { path: 'login', component: LoginComponent }
    // { path: '**', redirectTo: '/erro404', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRouting {}