export class Farmacia {
    private _id: number;
    private _nome: string;
    private _endereco: string;
    private _telefones: string[];

    get id(): number {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }

    get endereco(): string {
        return this._endereco;
    }

    get telefones(): string[] {
        return this._telefones;
    }
}