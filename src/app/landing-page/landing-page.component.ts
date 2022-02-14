import { Component, OnInit } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { CmsBannerComponent } from '@spartacus/core';
import { BannerComponent, CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent extends BannerComponent {
  
  constructor(protected component: CmsComponentData<CmsBannerComponent>) {
    super(component);
    this.getData();
  }

  getData(): void {
     this.data$.subscribe(event => {
      console.log(event)
    });  
  }

}
