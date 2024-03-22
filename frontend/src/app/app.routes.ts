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
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { MyTrainingsComponent } from './pages/my-trainings/my-trainings.component';
import { AddTrainingComponent } from './pages/add-training/add-training.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
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
    canActivate: [noAuthGuard],
  },
  {
    path: 'register/:type',
    component: RegistrationComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'join-us',
    component: JoinUsComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-account/edit',
    component: MyAccountEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-account/change-password',
    component: ChangePasswordComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-account/trainings',
    component: MyTrainingsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-account/trainings/add',
    component: AddTrainingComponent,
    canActivate: [authGuard],
  },
];
