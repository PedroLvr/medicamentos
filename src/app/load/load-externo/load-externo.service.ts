import { ComponentFactoryResolver, ApplicationRef, Injector, Injectable, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { LoadExternoComponent } from './load-externo.component';

@Injectable()
export class LoadExternoService {

    componentRef: ComponentRef<LoadExternoComponent> = null;
    private _calls: number = 0;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}

    show(): void {
        this._calls++;
        if(!this.componentRef) {
            // 1. Create a component reference from the component 
            this.componentRef = this.componentFactoryResolver
                .resolveComponentFactory(LoadExternoComponent)
                .create(this.injector);
            this.componentRef.changeDetectorRef.detectChanges();
            
            // 2. Attach component to the appRef so that it's inside the ng component tree
            this.appRef.attachView(this.componentRef.hostView);
            
            // 3. Get DOM element from component
            const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
            
            // 4. Append DOM element to the body
            document.body.appendChild(domElem);
        }
    }
    
    hide(): void {
        this._calls--;
        if(this._calls === 0) {
            // 5. Remove it from the component tree and from the DOM
            this.appRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}