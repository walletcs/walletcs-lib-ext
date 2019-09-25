import {Address} from "cluster";

export declare interface TXRef {
    tx_hash: string,
    block_height: number,
    tx_input_n: number,
    tx_output_n: number,
    value: number,
    ref_balance: number,
    spent: boolean,
    confirmations: number,
    confirmed: string,
    double_spend: boolean
}

export declare interface Address {
    address: string,
    total_received: number,
    total_sent: number,
    balance: number,
    unconfirmed_balance: number,
    final_balance: number,
    n_tx: number,
    unconfirmed_n_tx: number,
    final_n_tx: number,
    txrefs: Array<TXRef>,
    unconfirmed_txrefs: Array<TXRef>,
}

export declare interface BlockcypherError {
    error: string
}

export declare type AddressInfo = Address | BlockcypherError | string;

export declare interface TXInput {
    prev_hash: string,
    output_index: number,
    script: string,
    output_value: number,
    sequence: number,
    addresses: Array<string>,
    script_type: string,
    age: number
}

export declare interface TXOutput {
    value: number,
    script: string,
    spent_by: string,
    addresses: Array<string>,
    script_type: string
}

export declare interface TX {
    block_hash: string,
    block_height: number,
    hash: string,
    address: Array<string>,
    total: number,
    fees: number,
    size: number,
    preference: string,
    relayed_by: string,
    confirmed: string,
    received: string,
    ver: number,
    lock_time: number,
    double_spend: boolean,
    vin_sz: number,
    vout_sz: number,
    confirmations: number,
    inputs: Array<TXInput>,
    outputs: Array<TXOutput>
}

export declare type TXInfo = TX | BlockcypherError;
