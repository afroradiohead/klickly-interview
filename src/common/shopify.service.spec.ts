import {Component} from '@nestjs/common';

export interface ShopifyShop {
    shopifyShopId: number;
    name: string;
    domain: string;
}

@Component()
export class ShopifyService {
    findShopByName(storeName: string): ShopifyShop {
        return {shopifyShopId: 123, name: storeName, domain: 'adsfsafd'};
    }
}