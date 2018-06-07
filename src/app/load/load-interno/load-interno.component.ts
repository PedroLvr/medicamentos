import { Component, Input } from '@angular/core';

@Component({
    selector: 'load-interno',
    template: '',
    // template: `
    //     <div class='load-container'>
    //         <mat-spinner [diameter]='diametro'></mat-spinner>
    //     </div>
    // `,
    styleUrls: ['./load-interno.component.scss']
})
export class LoadInternoComponent {

    @Input('tam') diametro: number = 50;

    constructor() { }

}
