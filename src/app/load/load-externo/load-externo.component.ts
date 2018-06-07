import { Component, ChangeDetectorRef, ViewChild, NgZone } from '@angular/core';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';

@Component({
    selector: 'load-externo',
    template: '',
    // template: `
    //     <div class='load-overlay'>
    //         <mat-spinner [diameter]='40'></mat-spinner>
    //     </div>
    // `,
    styleUrls: ['./load-externo.component.scss']
})
export class LoadExternoComponent {}
