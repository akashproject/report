import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FootersComponent } from './shared/footers/footers.component';
import { HeadersComponent } from './shared/headers/headers.component';
import { AccountComponent } from './components/account/account.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EmergencyContactComponent } from './components/emergency-contact/emergency-contact.component';
import { EmergencyListComponent } from './components/emergency-list/emergency-list.component';
import { InvestmentsComponent } from './components/investments/investments.component';
import { DateformatPipe } from './pipes/dateformat.pipe';
import { PreviewComponent } from './components/preview/preview.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermConditionComponent } from './components/term-condition/term-condition.component';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrdersComponent } from './components/orders/orders.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HeadersComponent,
    FootersComponent,
    AccountComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EmergencyContactComponent,
    EmergencyListComponent,
    InvestmentsComponent,
    DateformatPipe,
    PreviewComponent,
    AboutComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    TermConditionComponent,
    CookiePolicyComponent,
    SubscriptionComponent,
    PaymentComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(), // ToastrModule added
    MDBBootstrapModule.forRoot(),
    BsDatepickerModule.forRoot(),    
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [HttpClientModule,BnNgIdleService],
  bootstrap: [AppComponent],
})
export class AppModule {}
