import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCarouselComponent } from './product-carousel.component';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { LayoutConfig } from '@spartacus/storefront';
import { MediaModule, ProductCarouselModule } from '@spartacus/storefront';

@NgModule({
  declarations: [
    ProductCarouselComponent
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
    cmsComponents: {
    // ProductCarouselComponent: {
    //   component: ProductCarouselComponent,
    //   disableSSR: true,
    // },
  }
}),
  MediaModule,
  ProductCarouselModule,
  ]
})
export class ProductCarouselModulee {}
