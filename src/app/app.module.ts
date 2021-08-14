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
import { EmargencyContactComponent } from './components/emargency-contact/emargency-contact.component';
import { EmargencyListComponent } from './components/emargency-list/emargency-list.component';
import { InvestmentsComponent } from './components/investments/investments.component';
import { DateformatPipe } from './pipes/dateformat.pipe';
import { PreviewComponent } from './components/preview/preview.component';
import { AboutComponent } from './components/about/about.component';
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
    EmargencyContactComponent,
    EmargencyListComponent,
    InvestmentsComponent,
    DateformatPipe,
    PreviewComponent,
    AboutComponent,
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
