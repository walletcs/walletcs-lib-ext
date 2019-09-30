import { InfuraProvider } from '../ethereum';
import {convertToHex} from "../utils";

describe('Ethereum infura service tests', () => {
    const url = 'https://rinkeby.infura.io/v3/72d82d32bcb841feb585980272d3185e';
    const address = '0x74930Ad53AE8E4CfBC3FD3FE36920a3BA54dd7E3';

    it('getNonce for address', async() => {
        const provider: InfuraProvider = new InfuraProvider(url);
        const result: number | string = await provider.getNonce(address);
        // @ts-ignore
        expect(Number.isInteger(result)).toBe(false);
    });

    it('getNonce for address with not correct address', async () => {
        const provider: InfuraProvider = new InfuraProvider(url);
        const result: number | string = await provider.getNonce('0x0000000000000000');

        expect(result).toBe('invalid argument 0: hex string has length 16, want 40 for common.Address');
    });

    it('getGasPrice from block', async () => {
        const provider: InfuraProvider = new InfuraProvider(url);
        const result: number | string = await provider.getGasPrice();

        expect(result).toBe(convertToHex(1000000000));
    });

    it('getGasLimit fro transaction', async () => {
        const provider: InfuraProvider = new InfuraProvider(url);
        const tx = {
            from: address,
            to: address,
            value: '0x' + Number(1000).toString(16)};
        const result: number | string = await provider.getGasLimit(tx);

        expect(result).toBe(convertToHex(21000))
    });

    it('getGasLimit fro transaction', async () => {
        const provider: InfuraProvider = new InfuraProvider(url);
        const tx = {
            from: '0x00000000000000000000000000000000',
            to: '0x00000000000000000000000000000000',
            value:  '0x' + Number(1000).toString(16),
            nonce:  '0x' + Number(1).toString(16)};
        // @ts-ignore
        const result: number | string = await provider.getGasLimit(tx);

        expect(result).toBe('invalid argument 0: hex string has length 32, want 40 for common.Address')
    });

    it('etherCall for contract', async() => {
        const provider: InfuraProvider = new InfuraProvider(url);
        const address = '0x74930Ad53AE8E4CfBC3FD3FE36920a3BA54dd7E3';
        const tx = {
            to: '0x0Ec4e6C918C7Ec927f1564DD94Fd7771779a70E9',
            nonce: await provider.getNonce(address),
            data: '',
            gasLimit: convertToHex(21000),
            gasPrice: convertToHex(1000000000),
        };
        const result: any = await provider.etherCall(tx, 'whitelistRelayer', [address, 1]);

        expect(result).toBe('0x');
    });

    it('getContractName for contract', async() => {
        const provider: InfuraProvider = new InfuraProvider(url);
        const result: any = await provider.getContractName('0x0Ec4e6C918C7Ec927f1564DD94Fd7771779a70E9');
        expect(result).toBe(null);
    })
});
