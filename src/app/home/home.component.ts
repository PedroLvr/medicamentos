import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    
    @ViewChild('heroBody') heroBody: ElementRef;
    autocompletes: Array<any> = [];

    constructor(
        public router: Router
    ) {}

    buscar(event) {
        let busca = event.target.elements[0].value;
        this.router.navigate(['busca'], {
            queryParams: {
                b: busca
            }
        });
    }

    autocompletar(event) {
        let value = event.target.value;
    }

}
