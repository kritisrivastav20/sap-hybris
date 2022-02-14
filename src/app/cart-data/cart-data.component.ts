import { CartDetailsComponent } from '@spartacus/storefront';
import { Component } from '@angular/core';
import {
  ActiveCartService,
  AuthService,
  RoutingService,
  SelectiveCartService,
} from '@spartacus/core';

@Component({
  selector: 'app-cart-data',
  templateUrl: './cart-data.component.html',
  styleUrls: ['./cart-data.component.scss']
})
export class CartDataComponent extends CartDetailsComponent {

  constructor(
    protected activeCartService: ActiveCartService,
    protected selectiveCartService: SelectiveCartService,
    protected authService: AuthService,
    protected routingService: RoutingService
  ) { 
    super(activeCartService, selectiveCartService, authService, routingService);
    this.getData();
  }

  getData() {
      setTimeout(() => {
            this.cart$.subscribe(event => {
            console.log(event)
    });  
      }, 1000);
  }
}
