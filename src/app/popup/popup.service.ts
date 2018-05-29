import { ComponentFactoryResolver, ApplicationRef, Injector, Injectable, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PopupComponent, CampoAlerta } from './popup.component';

@Injectable()
export class PopupService {

    componentRef: ComponentRef<PopupComponent> = null;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    alert(opcoes:{
        titulo?: string,
        texto?: string,
        textoBotaoOk?: string
    } = {}): PopupComponent {
        return this._createComponent('alert', opcoes);
    }

    confirm(opcoes:{
        titulo?: string,
        texto?: string,
        textoBotaoOk?: string,
        textoBotaoCancel?: string
    } = {}): PopupComponent {
        return this._createComponent('confirm', opcoes);
    }

    prompt(opcoes:{
        titulo?: string,
        texto?: string,
        campos?: Array<CampoAlerta>,
        textoBotaoOk?: string,
        textoBotaoCancel?: string
    } = {}) {
        return this._createComponent('input', opcoes);
    }

    hide(): void {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.componentRef = null;
    }

    private _createComponent(tipo: string = 'alert', opcoes: any): PopupComponent {
        if(!this.componentRef) {
            this.componentRef = this.componentFactoryResolver
                .resolveComponentFactory(PopupComponent)
                .create(this.injector);
    
            this.componentRef.instance.tipo = tipo;
            if(!!opcoes.titulo) this.componentRef.instance.titulo = opcoes.titulo;
            if(!!opcoes.texto) this.componentRef.instance.texto = opcoes.texto;
            if(!!opcoes.campos) this.componentRef.instance.campos = opcoes.campos;
            if(!!opcoes.textoBotaoOk) this.componentRef.instance.textoBotaoOk = opcoes.textoBotaoOk;
            if(!!opcoes.textoBotaoCancel) this.componentRef.instance.textoBotaoCancel = opcoes.textoBotaoCancel;
    
            this.componentRef.instance.onFechar.subscribe(() => {
                this.hide();
            });
    
            this.appRef.attachView(this.componentRef.hostView);
            const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
            document.body.appendChild(domElem);
    
            return this.componentRef.instance;
        } else {
            return null;
        }
    }
}