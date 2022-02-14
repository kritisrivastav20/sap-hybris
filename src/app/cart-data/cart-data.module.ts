import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartDataComponent } from './cart-data.component';
import {  CmsConfig, ConfigModule, FeaturesConfigModule, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { PromotionsModule } from '@spartacus/storefront';
import { CartCouponModule } from '@spartacus/storefront';
import { CartSharedModule } from '@spartacus/storefront';
import { CartDetailsComponent } from '@spartacus/storefront';
import { CartValidationWarningsModule } from '@spartacus/storefront';

@NgModule({
  declarations: [
    CartDataComponent
  ],
  imports: [
    CommonModule,
             ConfigModule.withConfig({
  cmsComponents: {
      CartComponent: {
          component: CartDataComponent,
        },
  }
}),
    CartSharedModule,
    CartCouponModule,
    RouterModule,
    UrlModule,
    PromotionsModule,
    FeaturesConfigModule,
    I18nModule,
    CartValidationWarningsModule,
  ]
})
export class CartDataModule { }
