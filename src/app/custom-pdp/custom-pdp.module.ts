import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomProductComponent } from './custom-product/custom-product.component';
import { CmsConfig, ConfigModule } from '@spartacus/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        // CMSLinkComponent : {
        //   component: CustomProductComponent,
        //   disableSSR: true,
        // }
      }
    } as CmsConfig)
  ]
})
export class CustomPdpModule { }
