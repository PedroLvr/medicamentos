import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoadInternoComponent } from './load-interno/load-interno.component';
import { LoadExternoComponent } from './load-externo/load-externo.component';
import { LoadExternoService } from './load-externo/load-externo.service';

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule
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
