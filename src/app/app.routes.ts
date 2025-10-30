import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { CartComponent } from './cart/cart.component';
import { MercahntComponent } from './mercahnt/mercahnt.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WalletComponent } from './wallet/wallet.component';
import { MerchantAddProductsComponent } from './merchant-add-products/merchant-add-products.component';
import { MerchantViewProductsComponent } from './merchant-view-products/merchant-view-products.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component'; ` `
import { MerchantUpdateProductComponent } from './merchant-update-product/merchant-update-product.component';
import { MerchantDeleteComponent } from './merchant-product-delete/merchant-product-delete.component';
import { OrderComponent } from './order/order.component';
import { AuthGuard } from './auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
// import { ProductComponent } from './product/product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'home', component: HomePageComponent},
  { path: 'login', component: LoginPageComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard],
    data: { expectedRole: 'Customer' },},
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard],
    data: { expectedRole: 'Customer' },},
  { path: 'merchant-add-products', component: MerchantAddProductsComponent, canActivate: [AuthGuard],
    data: { expectedRole: 'Merchant' } },
  { path: 'merchant-product-delete', component: MerchantDeleteComponent, canActivate: [AuthGuard],
    data: { expectedRole: 'Merchant' } },
  { path: 'merchant', component: MercahntComponent, canActivate: [AuthGuard],
    data: { expectedRole: 'Merchant' } },
  { path: 'merchant-view-products', component: MerchantViewProductsComponent, canActivate: [AuthGuard],
    data: { expectedRole: 'Merchant' } },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard],
    data: { expectedRole: 'Customer' },},
  { path: 'profile', component: UserProfileComponent},
  { path: 'products/:categoryName', component: ProductComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard],
    data: { expectedRole: 'Customer' },},
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'merchant-update-product',
    component: MerchantUpdateProductComponent, canActivate: [AuthGuard],
    data: { expectedRole: 'Merchant' } 
  },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard],
    data: { expectedRole: 'Customer' },}, // Define PaymentComponent here
];
