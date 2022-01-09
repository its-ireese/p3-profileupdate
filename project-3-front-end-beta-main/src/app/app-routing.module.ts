import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './shop/product-page/product-page.component';
import { StoreProductComponent } from './shop/store-product/store-product.component';
import { AdminGuard } from './users/admin/admin.guard';
import { AdminComponent } from './users/admin/admin.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { ProfileComponent } from './users/profile/profile.component';
// import { GamesComponent } from '../app/games/games.component';
// import { ComputersComponent } from './product/computers/computers.component';
// import { CellPhonesComponent } from './product/cell-phones/cell-phones.component';
// import { HeadPhonesComponent } from './product/head-phones/head-phones.component';
// import { TelevisionComponent } from './product/television/television.component';
// import { PhoneChargerComponent } from './product/phone-charger/phone-charger.component';
// import { RemoteControllersComponent } from './product/remote-controllers/remote-controllers.component';
// import { MiniFrigesComponent } from './product/mini-friges/mini-friges.component';
// import { DeskLampComponent } from './product/desk-lamp/desk-lamp.component';
// import { AirPurifiersComponent } from './product/air-purifiers/air-purifiers.component';
// import { GamePadsComponent } from './product/game-pads/game-pads.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent },
  // { path: "games", component: GamesComponent},
  // { path: "computers", component: ComputersComponent},
  // { path: "cell-phones", component: CellPhonesComponent},
  // { path: "head-phones", component: HeadPhonesComponent},
  // { path: "tv", component: TelevisionComponent},
  // { path: "phone-chargers", component: PhoneChargerComponent},
  // { path: "remote-controllers", component: RemoteControllersComponent},
  // { path: "mini-friges", component: MiniFrigesComponent},
  // { path: "desk-lamps", component: DeskLampComponent},
  // { path: "air-purifiers", component: AirPurifiersComponent},
  // { path: "game-pads", component: GamePadsComponent},
  { path: "checkout", component: CheckoutComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: 'product', component: StoreProductComponent },
  { path: '', redirectTo: 'product', pathMatch: 'full'},
  { path: "product-page", component: ProductPageComponent },
  { path: "product-page/:productId", component: ProductPageComponent },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

