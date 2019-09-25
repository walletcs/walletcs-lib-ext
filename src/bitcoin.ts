import { BitcoinProvider } from "./interfaces";
import { http } from './network';
import { Outx } from "./internalStructures";
import { TXRef, TXInfo, AddressInfo } from "./externalStructures/blockcypher";

export const buildOutx = (object: TXRef, address: string) : Outx => {
    return {
        address: address,
        satoshis: object.value,
        txId: object.tx_hash,
        outputIndex: object.tx_output_n,
    }
};

export class BlockCypherProvider extends BitcoinProvider {
    constructor(netwok: string){
        super(`https://api.blockcypher.com/v1/btc/`, netwok);
        this.url = this.url + this.network + '/'
    }

    async getOutxs(address: string){
        const response: AddressInfo = await http<AddressInfo>(this.url + 'addrs/' + address + '?unspentOnly=true');
        // @ts-ignore
        if (response.error){
            // @ts-ignore
            return response.error
        }
        // @ts-ignore
        return response.txrefs.map((value : TXRef) => {
            // @ts-ignore
            return buildOutx(value, response.address)
        });
    }

    async broadcast(tx: string) {
        const _tx = {tx: tx};
        const request: Request = new Request(this.url + 'txs/push', {method: 'POST', body: JSON.stringify(_tx) });
        const response : TXInfo = await http<TXInfo>(request);
        // @ts-ignore
        if (response.error){
            // @ts-ignore
            return response.error
        }
        // @ts-ignore
        return response.hash;
    }
}
