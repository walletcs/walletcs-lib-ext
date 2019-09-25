import 'whatwg-fetch';

export declare interface RPCRequestBody {
    jsonrpc: string,
    method: string,
    params: Array<any>,
    id?: number | null
}

interface Error {
    code: number,
    message: string,
}

export declare interface RPCResponse {
    jsonrpc: string,
    id: number | null,
    result?: any,
    error?: Error
}

const buildRPCRequest = (methodName: string, params: Array<any>, jsonrpc: string = '2.0'): RPCRequestBody => {
    return {jsonrpc: jsonrpc, method: methodName, params: params, id: Math.round(Math.random() * 100000)}
};

export const http = async <T>(request: RequestInfo): Promise <T> => {
    return new Promise(resolve => {
        fetch(request)
            .then((response: any) => response.json())
            .then((body: any) => {
                resolve(body);
            });
    });
};

export const rpcHttp = async (url: string, methodName: string, params: Array<any>): Promise<RPCResponse> => {
    const body: RPCRequestBody = buildRPCRequest(methodName, params);
    const request : Request = new Request(url , {method: 'POST', body: JSON.stringify(body) });
    return await http<any>(request);
};
