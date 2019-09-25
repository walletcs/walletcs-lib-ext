export declare interface Outx {
    address: string,
    satoshis: number,
    txId: string,
    outputIndex: number,
}

export declare interface From {
    address: string,
    change?: boolean,
}

export declare interface To {
    address: string,
    amount: number
}

export declare interface BTCInputFileTx {
    from: Array<From>,
    to: Array<To>,
    changeAddress: string,
    uxto: Array<Outx>,
    fee: number,
}

export declare interface Signatures {
    publicKey: string,
    prevTxId:  string,
    outputIndex: string,
    inputIndex: string,
    signature: string,
    sigtype: string,
}

export declare interface BitcoinInput {
    txId: string,
    outputIndex: string,
    address: string,
    satoshis: string,
    script: string,
    signatures: Array<Signatures>,
}


export declare interface EtherTransaction {
    to: Array<To> | string,
    from?: Array<From> | string,
    data?: string,
    nonce?: number | string,
    gasLimit?: number | string,
    gasPrice?: number | string,
    value?: number | string,
}

export declare interface EtherContractTransaction {
    to: Array<To>,
    from?: Array<From>,
    data?: string,
    nonce?: number,
    gasLimit?: number,
    gasPrice?: number,
}

export declare interface EtherFileTransaction {
    pubKey: string,
    transactions: Array<EtherTransaction>,
    contracts: any,
}
