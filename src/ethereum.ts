import * as ethers from 'ethers';
import {EtherProvider} from "./interfaces";
import { rpcHttp, RPCResponse, http } from "./network";
import { EtherTransaction } from "./internalStructures";
import { addABI, decodeMethod } from 'abi-decoder';

export class InfuraProvider extends EtherProvider {
    private __etherscan: string;
    private __api: string;
    constructor(url: string, network?: string){
        super(url, '');
        this.network = network || 'rinkeby';
        this.__etherscan = this.network === 'mainnet' ? '' : `-${this.network}`;
        this.__api = `https://api${this.__etherscan}.etherscan.io/api`;
    }
    async broadcast(tx: string): Promise<string> {
        const response: any = rpcHttp(this.url, 'eth_sendRawTransaction', [tx]);
        if (!response.error){
            return response.result;
        }
        return response.error;
    }

    async __requestRPC(methodName: string, params: Array<any> = []): Promise<number | string> {
        const response: RPCResponse = await rpcHttp(this.url, methodName, params);

        if (!response.error){
            return response.result;
        }
        return response.error.message;
    }

    static async __requestHTTP(url: string): Promise<any> {
        return await http(url);
    }

    async __get_etherscan_api(url: string): Promise<any> {
        const data = await InfuraProvider.__requestHTTP(url);

        if (data.status === '1'){
            return data.result;
        }

        return null;
    }

    async getNonce(address: string): Promise<number | string> {
        return await this.__requestRPC('eth_getTransactionCount', [address, 'latest']);
    }

    async getGasLimit(tx: EtherTransaction): Promise<number | string> {
        return await this.__requestRPC('eth_estimateGas',  [tx])
    }

    async getGasPrice() : Promise<number | string>  {
        return await this.__requestRPC('eth_gasPrice')
    }

    async getAbi(contractAddress: string): Promise<any> {
        const url = `${this.__api}?module=contract&action=getabi&address=${contractAddress}`;
        return this.__get_etherscan_api(url);
    }

    async etherCall(tx: EtherTransaction | string, methodName: string, params: Array<any>): Promise<any> {
        // @ts-ignore
        const abi = await this.getAbi(tx.to || tx);
        if (!abi) return null;
        const inter = new ethers.utils.Interface(abi);
        const method = inter.functions[methodName];
        // @ts-ignore
        tx.data = method.encode(params);

        return await this.__requestRPC('eth_call', [tx, 'latest']);
    }

    async getContractName(contractAddress: string): Promise<any> {
        const url = `${this.__api}?module=account&action=tokentx&contractaddress=${contractAddress}&page=1&offset=1`;
        const response = await this.__get_etherscan_api(url);
        if (!response) return response;
        return response[0].tokenName;
    }

    static addABI(abi: any): void {
        addABI(abi);
    }

    static decodeMethod(hexString: string): any {
        return decodeMethod(hexString);
    }
}
