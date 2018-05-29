import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { PopupService } from './popup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PopupComponent
    ],
    entryComponents: [
        PopupComponent
    ],
    exports: [
        PopupComponent
    ],
    providers: [
        PopupService
    ]
})
export class PopupModule {}
