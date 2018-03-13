import {Component} from '@nestjs/common';

export interface ShopifyShop {
    shopifyShopId: number;
    name: string;
    domain: string;
}

@Component()
export class ShopifyService {
    findShopByName(): ShopifyShop {
        return {shopifyShopId: 123, name: 'asdf', domain: 'adsfsafd'};
    }
}