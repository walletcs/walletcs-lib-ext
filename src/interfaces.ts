import * as structures from './internalStructures';
import {EtherTransaction} from "./internalStructures";

abstract class Provider {
    constructor(protected url: string, protected network: string) {}
    abstract async broadcast(tx: string) : Promise<string>;
}

export abstract class BitcoinProvider extends Provider {
    abstract async getOutxs(address: string) : Promise<Array<structures.Outx> | string>;
}

export abstract class EtherProvider extends Provider {
    abstract async getNonce(address: string) : Promise<number | string>;
    abstract async getGasLimit(tx: structures.EtherTransaction) : Promise<number | string>;
    abstract async getGasPrice() : Promise<number | string>;
    abstract async getAbi(contractAddress: string): Promise<any>;
    abstract async etherCall(tx: EtherTransaction | string, methodName: string, params: Array<any>): Promise<any>;
}
