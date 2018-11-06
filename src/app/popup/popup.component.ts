import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'popup',
    templateUrl: './popup.component.html'
})
export class PopupComponent {

    tipo: string = 'alerta';
    titulo: string = 'Alerta';
    texto: string = '';
    textoBotaoOk: string = 'OK';
    textoBotaoCancel: string = 'Cancelar';
    campos: Array<CampoAlerta>;
    formGroup: FormGroup;

    @ViewChild('input') input: ElementRef;

    @Output() onFechar = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        if(this.tipo === 'input') {
            let controls = {};
            this.campos.forEach(campo => {
                controls[campo.campo] = new FormControl('', campo.validacao);
            })

            this.formGroup = new FormGroup(controls);

            setTimeout(() => {
                this.input.nativeElement.focus();
            })
        }
    }

	hasError(control:string, validation?: string) {
		if (!!validation) {
			return this.formGroup.controls[control].hasError(validation);
		} else {
			return this.formGroup.controls[control].valid;
		}
	}

    fechar(res: boolean = false): void {
        if(this.tipo === 'input' && res) {
            this.onFechar.emit({res: res, values: this.formGroup.getRawValue()});
        } else {
            this.onFechar.emit({res: res});
        }
    }

    cancelar(): void {
        this.fechar(false);
    }

    ok(): void {
        this.fechar(true);
    }
}

export type CampoAlerta = {
    campo?: string,
    titulo?: string,
    validacao?: any | any[],
    min?: number,
    max?: number,
    obrigatorio?: boolean
}