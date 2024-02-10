import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { JoinUsComponent } from './pages/join-us/join-us.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MyAccountEditComponent } from './pages/my-account-edit/my-account-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register/:type',
    component: RegistrationComponent,
  },
  {
    path: 'join-us',
    component: JoinUsComponent,
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
  },
  {
    path: 'my-account/edit',
    component: MyAccountEditComponent,
  },
];
