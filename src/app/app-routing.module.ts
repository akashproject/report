import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountComponent } from './components/account/account.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EmergencyContactComponent } from './components/emergency-contact/emergency-contact.component';
import { EmergencyListComponent } from './components/emergency-list/emergency-list.component';
import { InvestmentsComponent } from './components/investments/investments.component';
import { PreviewComponent } from './components/preview/preview.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { TermConditionComponent } from './components/term-condition/term-condition.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'account', component: AccountComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'emergency-contact', component: EmergencyContactComponent },
  { path: 'emergency-list', component: EmergencyListComponent },
  { path: 'investments', component: InvestmentsComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'term-condition', component: TermConditionComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'cookie-policy', component: CookiePolicyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
