import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form_validate = false;
  passwordForm: any = {
    password: '',
  };
  c_password: '';
  constructor(
    private router: Router,
    public util: UtilService,
    private api: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('reset_user_data') == '') {
      this.router.navigate(['/']);
    }
  }

  SavePassword() {
    const param = {
      pwd: this.passwordForm.password,
      email: JSON.parse(localStorage.getItem('reset_user_data'))
        ? JSON.parse(localStorage.getItem('reset_user_data'))
        : '',
    };
    console.log(param);

    this.api.post('users/update_password', param).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.toastr.success(
            'password has been updated! goto login.',
            'Password Updated'
          );
          localStorage.setItem('reset_user_data', '');
          this.router.navigate(['/login']);
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

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  formValidation() {
    let re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (this.passwordForm.password == this.c_password && re.test(this.passwordForm.password) ) {
      this.form_validate = true;
    } else {
      this.form_validate = false;
    }
  }
}
