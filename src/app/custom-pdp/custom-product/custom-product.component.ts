import { Component, OnInit } from '@angular/core';
import { CurrentProductService } from '@spartacus/storefront';

@Component({
  selector: 'app-custom-product',
  templateUrl: './custom-product.component.html',
  styleUrls: ['./custom-product.component.scss']
})
export class CustomProductComponent implements OnInit {

  constructor(private currentProductService: CurrentProductService) { }

  ngOnInit(): void {
  }

}
