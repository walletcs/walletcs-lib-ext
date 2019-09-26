import {EtherProvider} from "./interfaces";
import { rpcHttp, RPCResponse } from "./network";
import { EtherTransaction } from "./internalStructures";

export class InfuraProvider extends EtherProvider {
    constructor(url: string){
        super(url, '');
    }
    async broadcast(tx: string): Promise<string> {
        const response: any = rpcHttp(this.url, 'eth_sendRawTransaction', [tx]);
        if (!response.error){
            return response.result;
        }
        return response.error;
    }

    async __request(methodName: string, params: Array<any> = []): Promise<number | string> {
        const response: RPCResponse = await rpcHttp(this.url, methodName, params);
        if (!response.error){
            return parseInt(response.result, 16);
        }
        return response.error.message;
    }

    async getNonce(address: string): Promise<number | string> {
        return await this.__request('eth_getTransactionCount', [address, 'latest'])
    }

    async getGasLimit(tx: EtherTransaction): Promise<number | string> {
        return await this.__request('eth_estimateGas',  [tx])
    }

    async getGasPrice() : Promise<number | string> {
        return this.__request('eth_gasPrice')
    }
}
