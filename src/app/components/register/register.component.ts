import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';
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
    public util: UtilService
  ) {
    this.dummy = this.util.countrys;
  }

  ngOnInit(): void {}
  sendCustomOtp(resend) {
    console.log(this.signupUserForm);

    const param = {
      mobile: '+91' + this.signupUserForm.mobile,
    };
    if (!resend) {
      this.showOtp = true;
    }

    this.api.post('users/sendRegistrationOtp', param).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.showOtp = true;
          this.hidden_otp_value = data.data.otp_value;
        } else if (data && data.status === 500) {
          this.util.getString(data.data.error);
        } else {
          this.util.getString('Something went wrong');
        }
      },
      (error) => {
        console.log(error);
        this.util.getString('Something went wrong');
      }
    );
  }

  verifyOtp() {
    if (this.hidden_otp_value == this.otp_value) {
      //this.navCtrl.navigateRoot([""]);
      this.signup();
    } else {
      this.util.getString('invalid one time password');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  selectedCC(item) {
    this.countries = [];
    console.log(item);
    this.cc = '+' + item.dialling_code + ' ' + item.country_name;
    this.ccCode = item.dialling_code;
  }

  onCountryInput(events) {
    console.log(events);
    if (events !== '') {
      this.countries = this.dummy.filter((item) => {
        return (
          item.country_name.toLowerCase().indexOf(events.toLowerCase()) > -1
        );
      });
    } else {
      this.countries = [];
    }
  }

  continue() {
    console.log(this.userCode);
    console.log('uid-->>', this.uid);
    if (this.userCode === '' || !this.userCode) {
      this.util.toast(
        'error',
        this.util.getString('Error'),
        this.util.getString('Not valid code')
      );
      return false;
    }
    if (this.userCode) {
      const param = {
        id: this.id,
        otp: this.userCode,
      };
      this.util.start();
      this.api.post('users/verifyOTP', param).subscribe(
        (data: any) => {
          console.log(data);
          if (data && data.status === 200) {
            const params = {
              status: 1,
              id: this.uid,
            };
            this.api.post('users/edit_profile', params).subscribe(
              (data: any) => {
                this.util.stop();
                console.log(data);
                localStorage.setItem('uid', this.uid);
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'bottom-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                  },
                });

                Toast.fire({
                  icon: 'success',
                  title: this.util.getString('Signed up successfully'),
                });
                this.router.navigate(['/home']);
              },
              (error) => {
                this.util.stop();
                console.log(error);
                this.util.toast(
                  'error',
                  this.util.getString('Error'),
                  this.util.getString('Something went wrong')
                );
              }
            );
          } else {
            this.util.stop();
            if (data && data.status === 500 && data.data && data.data.message) {
              // this.util.errorToast(data.data.message);
              this.util.toast(
                'error',
                this.util.getString('Error'),
                data.data.message
              );
              return false;
            }
            this.util.toast(
              'error',
              this.util.getString('Error'),
              this.util.getString('Something went wrong')
            );
            return false;
          }
        },
        (error) => {
          this.util.stop();
          console.log(error);
          this.util.toast(
            'error',
            this.util.getString('Error'),
            this.util.getString('Something went wrong')
          );
        }
      );
    } else {
      this.util.toast(
        'error',
        this.util.getString('Error'),
        this.util.getString('Not valid code')
      );
      return false;
    }
  }

  signup() {
    console.log(this.signupUserForm);
    this.api.post('users/registerUser', this.signupUserForm).subscribe(
      (data) => {
        console.log('userdata', data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sendVerification(mail, link) {
    const param = {
      email: mail,
      url: link,
    };

    this.api.post('users/sendVerificationMail', param).subscribe(
      (data) => {
        console.log('mail', data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onOtpChange(event) {
    console.log(event);
    this.userCode = event;
  }
}
