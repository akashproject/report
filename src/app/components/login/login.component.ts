import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UtilService } from 'src/app/services/util.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: any = '';
  password: any = '';
  mobile: any = '1234567890';
  showOtp = false;
  otp_value: any = '';
  hidden_otp_value: any = '';
  constructor(
    private router: Router,
    public util: UtilService,
    private api: ApiService,
    private navCtrl: Location
  ) {}

  ngOnInit(): void {}
  sendOtp(resend) {
    if (!this.mobile) {
      this.util.getString('Mobile number are required');
      return false;
    }
    let mobile = new String(this.mobile);
    console.log(mobile);
    console.log('Length ' + mobile.length);
    if (mobile.length != 10) {
      this.util.getString('invalid Mobile number');
      return false;
    }

    const param = {
      mobile: this.mobile,
    };

    this.api.post('users/sendLoginOtp', param).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          if (!resend) {
            this.showOtp = true;
          }
          this.hidden_otp_value = data.data.otp_value;
        } else if (data && data.status === 500) {
          this.util.getString(data.data.error);
        } else {
          this.util.getString('Something went wrong');
        }
      },
      (error) => {
        this.util.getString('Something went wrong');
      }
    );
  }

  verifyOtp() {
    if (this.hidden_otp_value == this.otp_value) {
      this.goToHome();
    } else {
      this.util.getString('invalid one time password');
    }
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToHome() {
    const param = {
      mobile: this.mobile,
    };
    this.util.start();
    this.api.post('users/loginForUser', param).subscribe(
      (data: any) => {
        this.util.stop();
        console.log(data);
        if (data && data.status === 200) {
          if (data && data.data && data.data.type === 'user') {
            if (data.data.status === '1') {
              localStorage.setItem('uid', data.data.id);
              localStorage.setItem('mobile', data.data.mobile);
              localStorage.setItem('first_name', data.data.first_name);
              localStorage.setItem('last_name', data.data.last_name);
              this.util.userInfo = data.data;
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
                title: this.util.getString('Signed in successfully'),
              });
              // this.router.navigate(['/home']);
              this.navCtrl.back();
            } else {
              console.log('not valid');
              Swal.fire({
                title: this.util.getString('Error'),
                text: this.util.getString(
                  'Your are blocked please contact administrator'
                ),
                icon: 'error',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: this.util.getString('Need Help?'),
                backdrop: false,
                background: 'white',
              }).then((status) => {
                if (status && status.value) {
                  localStorage.setItem('helpId', data.data.id);
                  this.router.navigate(['inbox']);
                }
              });
            }
          } else {
            this.util.toast(
              'error',
              this.util.getString('Error'),
              this.util.getString('Not valid user')
            );
            this.email = '';
            this.password = '';
          }
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
        console.log(error);
        this.util.toast(
          'error',
          this.util.getString('Error'),
          this.util.getString('Something went wrong')
        );
      }
    );
  }

  reset() {
    console.log('reset password');
    this.router.navigate(['reset']);
  }
}
