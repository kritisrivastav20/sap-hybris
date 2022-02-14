import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar.component';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { LayoutConfig } from '@spartacus/storefront';
import { MediaModule, NavigationModule } from '@spartacus/storefront';
import { AsyncPipe } from '@angular/common';
@NgModule({
  declarations: [
    NavigationBarComponent
  ],
  imports: [
    CommonModule,
           ConfigModule.withConfig({
  cmsComponents: {
    CategoryNavigationComponent: {
      component: NavigationBarComponent,
      disableSSR: true,
    },
  }
}),
NavigationModule,
MediaModule,
  ],
  providers: [AsyncPipe],
})
export class NavigationBarModule { }
