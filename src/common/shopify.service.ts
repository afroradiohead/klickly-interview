import {Component} from '@nestjs/common';
import {AccountModel} from '../models/typegoose/account.model';

@Component()
export class ShopifyService {
    getOauthUrlForStore(storeName){

        const client_id = '525eef020db642e3cf017eb51c2a351a';
        const client_password = 'b90b1f2ec40e7d07853701de7175bc25';
        const scopes = 'b90b1f2ec40e7d07853701de7175bc25';
        const nonce = 'sdiofn13r4fr09vj4q';
        const redirect_uri = 'http://localhost:3000';
        return `https://${storeName}.myshopify.com/admin/oauth/authorize?client_id=${client_id}&amp;scope=${scopes}&amp;redirect_uri=${redirect_uri}&amp;state=${nonce}&amp;`;

    }

    async a() {

    }
}