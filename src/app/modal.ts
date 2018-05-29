import { ComponentFactoryResolver, ApplicationRef, Injector, Injectable, EmbeddedViewRef, ComponentRef } from '@angular/core';

@Injectable()
export class Modal {

    componentRef: ComponentRef<any> = null;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    show(componente: any, dados?: any): any {
        return this._createComponent(componente, dados);
    }

    hide(): void {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.componentRef = null;
    }

    private _createComponent(componente: any, dados?: any): any {
        if(!this.componentRef) {
            this.componentRef = this.componentFactoryResolver
                .resolveComponentFactory(componente)
                .create(this.injector);

            for (const key in dados) {
                const value = dados[key];
                this.componentRef.instance[key] = value;
            }
    
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