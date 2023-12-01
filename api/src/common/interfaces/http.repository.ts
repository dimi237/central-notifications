import http from 'request-promise';


export abstract class HttpRepository {
    protected baseUrl: string
    constructor() {
        this.baseUrl = '';
    }

    protected async sendRequest(uri: string, options: http.RequestPromiseOptions) {
        const result = await http(`${this.baseUrl}/${uri}`, options);
        return result;
    }

}