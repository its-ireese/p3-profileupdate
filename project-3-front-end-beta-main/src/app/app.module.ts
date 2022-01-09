import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './users/admin/admin.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { HeaderComponent } from './header/header.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { StoreProductComponent } from './shop/store-product/store-product.component';
import { ProfileComponent } from './users/profile/profile.component';
import { ProductPageComponent } from './shop/product-page/product-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    HeaderComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    StoreProductComponent,
    ProfileComponent,
    ProductPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
