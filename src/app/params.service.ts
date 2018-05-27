import { Injectable } from '@angular/core';

@Injectable()
export class ParamsService {
    private _params: object = {};

    set(data: object): void {
        this._params = data;
    }
    
    add(data: object) {
        for(var key in data) {
            this._params[key] = data[key];
        }
    }

    getAll(): object {
        return this._params;
    }

    get(key: string): any {
        return this._params[key];
    }

    destroy(): void {
        this._params = {};
    }

}