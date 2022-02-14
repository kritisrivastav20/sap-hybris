import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "@spartacus/storefront";
import { AppComponent } from './app.component';
import { SpartacusModule } from './spartacus/spartacus.module';
import { CustomPdpModule } from "./custom-pdp/custom-pdp.module";
import { translationChunksConfig, translations } from '@spartacus/assets';
import { ConfigModule } from '@spartacus/core';
import { MediaModule } from "@spartacus/storefront";
import {LandingPageModule} from './landing-page/landing-page.module';
import { CommonModule } from "@angular/common";
import { NavigationBarModule } from './navigation-bar/navigation-bar.module';
import { ProductCarouselModulee } from "./product-carousel/product-carousel.module";
import { AsyncPipe } from '@angular/common';
import { CartButtonModule } from './cart-button/cart-button.module';
import { RegisterPageModule } from './register-page/register-page.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CartDataModule } from './cart-data/cart-data.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
    CustomPdpModule,
    LandingPageModule,
    NavigationBarModule,
    ProductCarouselModulee,
    CartButtonModule,
    RegisterPageModule,
    CartDataModule,
      ConfigModule.withConfig({
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    MediaModule,
    CommonModule,
  ],
  providers: [ AsyncPipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
