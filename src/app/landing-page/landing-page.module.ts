import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { LayoutConfig } from '@spartacus/storefront';
import { MediaModule } from '@spartacus/storefront';
import { GenericLinkModule } from '@spartacus/storefront';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
         ConfigModule.withConfig({
  cmsComponents: {
    SimpleResponsiveBannerComponent: {
      component: LandingPageComponent,
      disableSSR: true,
    },
      BannerComponent: {
      component: LandingPageComponent
    },
    SimpleBannerComponent: {
      component: LandingPageComponent
    }
  }
}),
  GenericLinkModule, MediaModule
  ]
})
export class LandingPageModule { }
