import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  mobile: any = '';
  email: any = '';
  showOtp = false;
  beforeLoginUser = '';
  otp_value: any = '';
  // hidden_otp_value_email: any = '';
  // hidden_otp_value_mobile: any = '';
  hidden_otp_id: any = '';
  form_validate = false;
  loginForm: any = {
    post_data: '',
    password: '',
  };
  constructor(
    private router: Router,
    public util: UtilService,
    private api: ApiService,
    private navCtrl: Location,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

  }

  loginuser() {
    this.api.post('users/loginForUser', this.loginForm).subscribe(
      (data: any) => {
        if (data && data.status == '200') {
          if (data.data.status === 'active') {
            this.beforeLoginUser = JSON.stringify(data.data); //localStorage.setItem('user', );
            this.mobile = data.data.mobile;
            this.email = data.data.email;
            this.sendOtp(false);
          } else {
            this.toastr.error(
              'Your are blocked please contact administrator',
              'Error!'
            );
          }

          //this.router.navigate(['/account']);
        } else if (data && data.status == '500') {
          this.toastr.error(data.data.message, 'Error!');
          this.showOtp = false;
        } else {
          this.toastr.error('Something went wrong', 'Error!');
          this.showOtp = false;
        }
      },
      (error) => {
        this.showOtp = false;
        this.toastr.error('error', 'Error!');
      }
    );
  }

  sendOtp(resend) {
    if (!this.mobile) {
      this.toastr.error('Invalid Mobile Number', 'Error!');
      return false;
    }
    let mobile = new String(this.mobile);
    if (mobile.length != 10) {
      this.toastr.error('Invalid Mobile Number', 'Error!');
      return false;
    }
    const param = {
      post_data: this.mobile,
    };
    this.api.post('users/sendLoginOtp', param).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.toastr.success(
            'has been sent to your mobile',
            'One time password'
          );
          if (!resend) {
            this.showOtp = true;
          }          
          this.hidden_otp_id = data.data;
        } else if (data && data.status === 500) {
          this.toastr.error(data.data.error, 'Error!');
        } else {
          this.toastr.error('Something went wrong', 'Error!');
        }
      },
      (error) => {
        this.toastr.error('error', 'Error!');
      }
    );
  }

  verifyOtp() {
    const param = {
      otp_value: this.otp_value,
      otp_id:this.hidden_otp_id
    };
    this.api.post('users/verifyLoginOtp', param).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.util.userInfo = JSON.parse(this.beforeLoginUser);
          this.router.navigate(['/account']);
        } else if (data && data.status === 500) {
          this.toastr.error(data.data.error, 'Error!');
        } else {
          this.toastr.error('invalid one time password', 'Error!');
        }
      },
      (error) => {
        this.toastr.error('invalid one time password', 'Error!');
      }
    );

  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goToHome() {
    const param = {
      mobile: this.mobile,
    };
    this.util.start();
    this.api.post('users/loginForUser', param).subscribe(
      (data: any) => {
        this.util.stop();
        if (data && data.status === 200) {
        } else if (data && data.status === 500) {
          this.util.toast(
            'error',
            this.util.getString('Error'),
            data.data.message
          );
        } else {
          this.util.toast(
            'error',
            this.util.getString('Error'),
            this.util.getString('Something went wrong')
          );
        }
      },
      (error) => {
        this.util.toast(
          'error',
          this.util.getString('Error'),
          this.util.getString('error')
        );
      }
    );
  }

  reset() {
    this.router.navigate(['reset']);
  }

  formValidation() {
    if (this.loginForm.password != '' && this.loginForm.email != '') {
      this.form_validate = true;
    }
  }
}
