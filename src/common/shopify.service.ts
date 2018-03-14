import {Component} from '@nestjs/common';
import * as crypto from 'crypto';
import * as querystring from 'querystring';

const client_id = '525eef020db642e3cf017eb51c2a351a';
const client_password = 'b90b1f2ec40e7d07853701de7175bc25';
const scopes = 'read_content';
const nonce = 'sdiofn13r4fr09vj4q';
const redirect_uri = 'http://localhost:3000/api/migrate';

@Component()
export class ShopifyService {
    getOauthUrlForStore(storeName){
        const shopName = storeName;
        return `https://${shopName}.myshopify.com/admin/oauth/authorize?client_id=${client_id}&amp;scope=${scopes}&amp;redirect_uri=${redirect_uri}&amp;state=${nonce}&amp;`;

    }

    createHmacHash(query: {code: string; hmac: string; shop: string; state: string; timestamp: number}){
        const map = Object.assign({}, query);
        delete map.hmac;
        const message = querystring.stringify(map);
        const generatedHash = crypto
            .createHmac('sha256', client_password)
            .update(message)
            .digest('hex');

        return generatedHash;

    }

    createAccessTokenPayload(code){
        return  {
            client_id,
            client_secret: client_password,
            code,
        };
    }


    createAccessTokenRequestUrl(shop: string) {
        return 'https://' + shop + '/admin/oauth/access_token';
    }


}