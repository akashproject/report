import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showOtp = false;
  otp_value: any = '';
  hidden_otp_value: any = '';
  signupUserForm: any = {
    email: '',
    full_name: '',
    mobile: '',
    password: '',
  };
  c_password: '';

  resendCode: boolean;
  textCode: any = '';
  id: any;
  userCode: any = '';
  uid: any;

  cc: any = '';
  ccCode: any = '91';
  countries: any[] = [];
  dummy: any[] = [];
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService
  ) {
    this.dummy = this.util.countrys;
  }

  ngOnInit(): void {
    if (this.util.userInfo != '') {
      this.router.navigate(['/profile']);
    }
  }
  sendCustomOtp(resend) {
    console.log(this.signupUserForm);

    const param = {
      mobile: '+91' + this.signupUserForm.mobile,
    };

    this.api.post('users/sendRegistrationOtp', param).subscribe(
      (data: any) => {
        if (data && data.status == '200') {
          this.showOtp = true;
          this.hidden_otp_value = data.data.otp_value;
        } else if (data && data.status == '500') {
          this.toastr.error(data.data.error, 'Error!');
        } else {
          this.toastr.error('Something went wrong', 'Error!');
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error('Something went wrong', 'Error!');
      }
    );
  }

  verifyOtp() {
    if (this.hidden_otp_value == this.otp_value) {
      //this.navCtrl.navigateRoot([""]);
      this.signup();
    } else {
      this.toastr.error('invalid one time password', 'Error!');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  signup() {
    this.api.post('users/registerUser', this.signupUserForm).subscribe(
      (data: any) => {
        if (data && data.status == '200') {
          localStorage.setItem('user', JSON.stringify(data.data));
          this.router.navigate(['/profile']);
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
        this.toastr.error('Something went wrong', 'Error!');
      }
    );
  }

  onOtpChange(event) {
    console.log(event);
    this.userCode = event;
  }
}
