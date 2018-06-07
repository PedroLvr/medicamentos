import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadInternoComponent } from './load-interno/load-interno.component';
import { LoadExternoComponent } from './load-externo/load-externo.component';
import { LoadExternoService } from './load-externo/load-externo.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadInternoComponent,
        LoadExternoComponent
    ],
    entryComponents: [
        LoadExternoComponent
    ],
    exports: [
        LoadInternoComponent,
        LoadExternoComponent
    ],
    providers: [ LoadExternoService ]
})
export class LoadModule { }
