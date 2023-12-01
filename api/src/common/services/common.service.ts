
export class CommonService {
    static timeout(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }

    static getRandomString(size: number, numberOnly?: boolean) {
        size = size || 10;
        const chars = numberOnly ?
            '0123456789' :
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ';
        let randomstring = '';
        for (let i = 0; i < size; i++) {
            const rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }

    static generateErrResponse(message: string, err: Error, title?: string) {
        const errResp: any = { details: message };
        if (title) { errResp.title = title; }
        return errResp;
    }

    
}