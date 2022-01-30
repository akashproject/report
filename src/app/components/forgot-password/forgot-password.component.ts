import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  mobile: any = '';
  email: any = '';
  showOtp = false;
  otp_value: any = '';
  // hidden_otp_value_email: any = '';
  // hidden_otp_value_mobile: any = '';
  hidden_otp_id: any = '';
  form_validate = false;
  passwordForm: any = {
    post_data: '',
  };
  constructor(
    private router: Router,
    public util: UtilService,
    private api: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // if (this.util.userInfo != '') {
    //   this.router.navigate(['/account']);
    // }
  }

  sendOtp(resend) {
    this.api.post('users/sendLoginOtp', this.passwordForm).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          if (!resend) {
            this.showOtp = true;
          }
          localStorage.setItem('reset_user_data', this.passwordForm.post_data);
          this.hidden_otp_id = data.data;
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
    const param = {
      otp_value: this.otp_value,
      otp_id:this.hidden_otp_id
    };
    this.api.post('users/verifyLoginOtp', param).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.router.navigate(['/reset-password']);
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

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
  formValidation() {
    if (this.passwordForm.email != '') {
      this.form_validate = true;
    }
  }
}
