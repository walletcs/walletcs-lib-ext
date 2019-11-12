import { BlockCypherProvider } from "../src/bitcoin";
import { Outx } from "../src/internalStructures";
import { AddressInfo } from "../src/externalStructures/blockcypher";

describe('Bitcoin blockcypher service tests',  () => {
    const address: string = 'muDLjgyx4JEUPHH6XtxtgTjJZsJNYwGDoe';

    it('get outxs from provider', async() =>{
        const provider : BlockCypherProvider = new BlockCypherProvider('test3');
        const result : Array<Outx> = await provider.getOutxs(address);

        expect(Array.isArray(result)).toBe(true);
    });

    it('get outxs with error', async () => {
        const provider : BlockCypherProvider = new BlockCypherProvider('test3');
        const response: AddressInfo = await provider.getOutxs('0x0');
        expect(response).toBe('Error: wallet not found')

    });

    it('broadcast empty raw tx', async () => {
        const provider : BlockCypherProvider = new BlockCypherProvider('test3');
        const result: string = await provider.broadcast('');

        expect(result).toBe('Error validating transaction: Transaction missing input or output..')
    });
});
