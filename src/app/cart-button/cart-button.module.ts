import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from './cart-button.component';
import { ConfigModule } from '@spartacus/core';
import { LayoutConfig } from '@spartacus/storefront';
import { MediaModule, MiniCartModule, LoginRouteModule} from '@spartacus/storefront';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { PageSlotModule } from '@spartacus/storefront';

@NgModule({
  declarations: [
    CartButtonComponent
  ],
  imports: [
    CommonModule,
             ConfigModule.withConfig({
  cmsComponents: {
    MiniCartComponent: {
      component: CartButtonComponent,
      disableSSR: true,
    },
      LoginComponent: {
      component: CartButtonComponent
    },
  }
}),
  MediaModule,
  MiniCartModule,
  UrlModule, PageSlotModule, I18nModule
  ]
})
export class CartButtonModule { }
