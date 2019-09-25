import * as structures from './internalStructures';

abstract class Provider {
    constructor(protected url: string, readonly network: string) {}
    abstract async broadcast(tx: string) : Promise<string>;
}

export abstract class BitcoinProvider extends Provider {
    abstract async getOutxs(address: string) : Promise<Array<structures.Outx> | string>;
}

export abstract class EtherProvider extends Provider {
    abstract async getNonce(address: string) : Promise<number | string>;
    abstract async getGasLimit(tx: structures.EtherTransaction) : Promise<number | string>;
    abstract async getGasPrice() : Promise<number | string>;
}
