export interface Token {
    access_token: string;
    refresh_token: string;
    token_type: string;
    issued: number;
    expires_in: number;
}