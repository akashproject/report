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
  form_validate = false;
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
  ) {}

  ngOnInit(): void {
    
  }
  sendCustomOtp(resend) {
    const param = {
      mobile: this.signupUserForm.mobile,
      email: this.signupUserForm.email,
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
          this.toastr.success('You have successfully registered.', 'Success!');
          localStorage.setItem('user', JSON.stringify(data.data));
          localStorage.setItem('loginflag', '1');
          this.router.navigate(['/account']).then(() => {
            window.location.reload();
          });
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

  formValidation() {
//    let mobileElements = document.getElementById("mobileno").querySelectorAll("[required]");
    let mobile = new String(this.signupUserForm.mobile);
    let re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    
    // if (re.test(this.signupUserForm.password)) {
    //     console.log("Valid");
    // } else {
    //     console.log("Invalid");
    // }

    if (
      this.signupUserForm.password == this.c_password &&
      this.signupUserForm.full_name != '' &&
      this.signupUserForm.mobile != ''  &&
      mobile.length == 10 &&
      re.test(this.signupUserForm.password)
    ) {
      this.form_validate = true;
    } else {
      this.form_validate = false;
    }
  }
}
