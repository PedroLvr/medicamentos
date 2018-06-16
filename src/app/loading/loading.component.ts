import { Component } from '@angular/core';

@Component({
    selector: 'loading',
    template: `
        <div class='load-overlay is-flex'>
            <i class="fa fa-spinner fa-4x fa-spin has-text-white" aria-hidden="true"></i>
        </div>
    `,
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {}
