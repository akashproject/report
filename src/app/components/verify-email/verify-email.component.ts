import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  otp_value: any = '';
  hidden_otp_value_email: any = '';
  isEmailVerified: any;
  currentDiv: any;
  email: any = this.util.userInfo.email;

  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService
  ) {
    this.isEmailVerified = this.util.userInfo.isEmailVerified;
    console.log(this.util.userInfo, JSON.parse(localStorage.getItem('user')));

    this.sendOtp();
  }

  ngOnInit(): void {
    if (this.util.userInfo == '') {
      this.router.navigate(['/']);
    }
  }

  sendOtp() {
    if (!this.email) {
      this.toastr.error('Something went wrong', 'Error!');
      return false;
    }

    const param = {
      email: this.email,
    };
    this.api.post('users/sendVerificationEmailOtp', param).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.hidden_otp_value_email = data.data.otp_value_email;
        } else if (data && data.status === 500) {
          this.toastr.error(data.data.error, 'Error!');
        } else {
          this.toastr.error('Something went wrong', 'Error!');
        }
      },
      (error) => {
        this.toastr.error('Something went wrong', 'Error!');
      }
    );
  }

  verifyOtp() {
    if (this.hidden_otp_value_email == this.otp_value) {
      const param = {
        id: this.util.userInfo.id,
        email_verified: true,
      };
      this.api.post('users/updateEmailVerification', param).subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            localStorage.setItem('user', JSON.stringify(data.data));
            this.util.userInfo = data.data;
            this.router.navigate(['/account']);
          } else if (data && data.status === 500) {
            this.toastr.error(data.data.error, 'Error!');
          } else {
            this.toastr.error('Something went wrong', 'Error!');
          }
        },
        (error) => {
          this.toastr.error('Something went wrong', 'Error!');
        }
      );
    } else {
      this.toastr.error('invalid one time password', 'Error!');
    }
  }
}
