import { Injectable } from '@angular/core';

@Injectable()
export class NavParams {
    private _params: object = {};

    set(data: object): void {
        this._params = data;
    }

    add(obj: object): void {
        Object.keys(obj).forEach(key => {
            let value = obj[key];
            this._params[key] = value;
        })
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