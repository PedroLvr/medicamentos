import { Farmacia } from './farmacia';

export class Remedio {
    private _id: number;
    private _nome: string;
    private _tipo: string;
    private _farmacias: Farmacia[];

    get id(): number {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }

    get farmacias(): Farmacia[] {
        return this._farmacias;
    }
}