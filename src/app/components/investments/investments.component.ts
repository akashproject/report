import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss'],
})
export class InvestmentsComponent implements OnInit {
  mobile: any = '';
  @ViewChild('contactModal') public contactModal: ModalDirective;
  email: any = '';
  showOtp = false;
  otp_value_email: any = '';
  otp_value_mobile: any = '';
  hidden_otp_value_email: any = '';
  hidden_otp_value_mobile: any = '';
  profileForm: any = {
    id: this.util.userInfo.id,
    full_name: this.util.userInfo.full_name,
    address: this.util.userInfo.address,
    pan_no: '',
    adhaar_no: '',
  };
  emContacts: any = [];

  isEmailVerified: any;
  isContactadded: any;
  currentDiv: any;
  form_validate = false;
  password_validate = false;
  newContact: boolean;
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService
  ) {
    this.currentDiv = 1;
  }

  ngOnInit(): void {
    if (this.util.userInfo == '') {
      this.router.navigate(['/']);
    }

    this.isEmailVerified = this.util.userInfo.email_verified;
    console.log(this.util.userInfo);

    this.isContactadded = this.util.userInfo.contact_added;
    if (this.util.userInfo.id) {
      this.getUserRecords();
    }
  }

  getUserRecords() {
    this.api
      .get('investments/get-user-records/' + this.util.userInfo.id)
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            this.emContacts = [];
            for (let i = 0; i < Object.keys(data.data).length; i++) {
              this.emContacts.push(data.data[i]);
              // for (const key in data.data[i]) {
              //   this.myContacts[i][key] = data.data[i][key];
              // }
            }
            console.log(this.emContacts);
          } else if (data && data.status === 500) {
            this.toastr.error(data.data.message, 'Error!');
          } else {
            this.toastr.error('Something went wrong', 'Error!');
          }
        },
        (error) => {
          this.toastr.error('Something went wrong', 'Error!');
        }
      );
  }

  investmentDetails() {
    this.currentDiv = 2;
  }

  parsonalDetails() {
    this.currentDiv = 1;
    console.log(this.emContacts);
  }

  logout() {
    localStorage.clear();
    this.util.userInfo = null;
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  sendVerificationOtp(resend) {
    if (
      this.profileForm.email != this.util.userInfo.email ||
      this.profileForm.mobile != this.util.userInfo.mobile
    ) {
      const param = {
        post_data: this.mobile,
      };
      this.api.post('users/sendOtp', this.profileForm).subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            if (!resend) {
              this.currentDiv = 5;
              this.showOtp = true;
            }
            if (data.data.otp_value_email) {
              this.hidden_otp_value_email = data.data.otp_value_email;
            }
            if (data.data.otp_value_mobile) {
              this.hidden_otp_value_mobile = data.data.otp_value_mobile;
            }
          } else if (data && data.status === 500) {
            this.toastr.error(data.data.message, 'Error!');
          } else {
            this.toastr.error('Something went wrong', 'Error!');
          }
        },
        (error) => {
          this.toastr.error('Something went wrong', 'Error!');
        }
      );
    } else {
      this.update();
    }
  }

  verifyOtp() {
    if (
      (this.hidden_otp_value_email != '' &&
        this.hidden_otp_value_email == this.otp_value_email) ||
      (this.hidden_otp_value_mobile != '' &&
        this.hidden_otp_value_mobile == this.otp_value_mobile)
    ) {
      this.update();
    } else {
      this.toastr.error('invalid one time password', 'Error!');
    }
  }

  update() {
    console.log(this.profileForm);
    this.api.post('users/edit_profile', this.profileForm).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          localStorage.setItem('user', JSON.stringify(data.data));
          this.util.userInfo = JSON.parse(localStorage.getItem('user'));
          this.toastr.success('Profile has been updated', 'Success');
        } else if (data && data.status === 500) {
          this.toastr.error(data.data.message, 'Error!');
        } else {
          this.toastr.error('Something went wrong', 'Error!');
        }
      },
      (error) => {
        this.toastr.error('Something went wrong', 'Error!');
      }
    );
  }

  openProfile() {
    this.router.navigate(['/account']);
  }

  formValidation() {
    console.log(this.profileForm);

    if (
      this.profileForm.full_name != this.util.userInfo.full_name ||
      this.profileForm.email != this.util.userInfo.email ||
      this.profileForm.mobile != this.util.userInfo.mobile ||
      this.profileForm.address != this.util.userInfo.address
    ) {
      this.form_validate = true;
    } else {
      this.form_validate = false;
    }
  }
}
