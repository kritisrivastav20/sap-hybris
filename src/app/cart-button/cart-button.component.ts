import { Component, OnInit } from '@angular/core';
import { CmsService, urlPathJoin } from '@spartacus/core';
import { CmsAddToCartComponent, CmsLinkComponent } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { ActiveCartService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss']
})
export class CartButtonComponent implements OnInit {

  public isLoggedIn: boolean = true;
  public showCart: boolean = false;
  public result: any;
  public data$: Observable<any> = this.componentData.data$;
  user$: Observable<User | undefined>;

  constructor(private componentData: CmsComponentData<any>,
     private auth: AuthService,
    private userAccount: UserAccountFacade,
    private router: Router) { 
     this.auth.isUserLoggedIn().subscribe(ev => {
       this.isLoggedIn = ev;
     })

       this.user$ = this.auth.isUserLoggedIn().pipe(
      switchMap((isUserLoggedIn) => {
        if (isUserLoggedIn) {
          return this.userAccount.get();
        } else {
          return of(undefined);
        }
      })
    );
    }

  ngOnInit(): void {
     this.data$.subscribe(event => {
     this.result = event
     if(this.result.uid === 'MiniCart') {
       this.showCart = true
     }
    });  
  }

  goToPage(url: string) {
    switch(url) {
      case 'register': {
        this.router.navigateByUrl('electronics-spa/en/USD/login/register');
        break;
      }
      case 'signIn': {
        this.router.navigateByUrl('/electronics-spa/en/USD/login');
        break;
      }
    }
  }
}
