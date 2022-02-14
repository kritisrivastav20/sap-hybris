import { Component, OnInit } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { CmsNavigationComponent } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { NavigationNode, NavigationService } from '@spartacus/storefront';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  public result: any;
  public node: any;
  public imgSource: any = 'abcd';
   data$: Observable<any>;
   node$: Observable<any>;

  constructor(private componentData: CmsComponentData<CmsNavigationComponent>,
    private service: NavigationService) {
      this.data$ = this.componentData.data$;
      this.node$ = this.service.getNavigationNode(
    this.componentData.data$
  );
    }

  ngOnInit(): void {
    //  this.data$.subscribe(event => {
    //  console.log(event)
    //  this.result = event;
    // });  
    //  this.node$.subscribe(event => {
    //  console.log(event)
    //  this.node = event;
    // });  
  }

}
