import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-investments',
  templateUrl: './create-investments.component.html',
  styleUrls: ['./create-investments.component.scss']
})
export class CreateInvestmentsComponent implements OnInit {
  mobile: any = '';
  @ViewChild('contactModal') public contactModal: ModalDirective;
  email: any = '';
  showOtp = false;
  otp_value_email: any = '';
  otp_value_mobile: any = '';
  hidden_otp_value_email: any = '';
  hidden_otp_value_mobile: any = '';
  contactForm: any = {
    id: '',
    name: '',
    email: '',
    mobile: '',
    address: '',
  };
  profileForm: any = {
    id: this.util.userInfo.id,
    email: this.util.userInfo.email,
    full_name: this.util.userInfo.full_name,
    mobile: this.util.userInfo.mobile,
    address: this.util.userInfo.address,
  };
  myContacts: any = [];
  changePasswordForm: any = {
    id: this.util.userInfo.id,
    old_password: '',
    password: '',
  };
  c_password: any;
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
      this.getAllContacts();
    }
  }

  goTobusiness() {
    if (this.isContactadded) {
      this.currentDiv = 2;
    } else {
      this.toastr.error('Add Emargency contact first', 'Error!');
    }
  }

  gotoPassword() {
    this.currentDiv = 3;
  }

  gotoContact() {
    this.currentDiv = 4;
    console.log(this.myContacts);
  }

  getAllContacts() {
    this.api
      .get('users/get_emargencycontact/' + this.util.userInfo.id)
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            this.myContacts = [];
            for (let i = 0; i < Object.keys(data.data).length; i++) {
              this.myContacts.push(data.data[i]);
              // for (const key in data.data[i]) {
              //   this.myContacts[i][key] = data.data[i][key];
              // }
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
  }

  logout() {
    localStorage.clear();
    this.util.userInfo = null;
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  addNewContact() {
    this.router.navigate(['/emargency-contact']);
  }

  actionContact() {
    this.api.post('users/add_emargency', this.contactForm).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.contactModal.hide();
          this.toastr.success('Emargency contact has been updated', 'Success');
          this.router.navigate(['/account']);
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

  updatePassword() {
    console.log(this.changePasswordForm, this.c_password);
    if (this.changePasswordForm.password != this.c_password) {
      this.toastr.error(
        "Password and Confirm password does'nt matched",
        'Error!'
      );
      return false;
    }
    this.api.post('users/updatePassword', this.changePasswordForm).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.toastr.success('Password has been updated', 'Success');
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
    let params: any = {
      id: this.util.userInfo.id,
    };
    this.api.post('users/getById', params).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          localStorage.setItem('user', JSON.stringify(data.data));
          this.util.userInfo = JSON.parse(localStorage.getItem('user'));
          this.currentDiv = 1;
          this.profileForm.id = data.data.id;
          this.profileForm.email = data.data.email;
          this.profileForm.full_name = data.data.full_name;
          this.profileForm.mobile = data.data.mobile;
          this.profileForm.address = data.data.address;
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

  updateContact(item) {
    this.newContact = false;
    this.contactForm.id = item.id;
    this.contactForm.name = item.name;
    this.contactForm.email = item.email;
    this.contactForm.mobile = item.mobile;
    this.contactForm.address = item.address;
    this.contactModal.show();
  }

  deleteContact(item) {
    console.log(item);
    Swal.fire({
      title: 'Are you sure',
      text: 'to delete this address',
      icon: 'error',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      backdrop: false,
      background: 'white',
    }).then((status) => {
      if (status && status.value) {
        console.log('delete');
        const param = {
          id: item.id,
        };
        this.util.start();
        this.api.post('users/deleteContact', param).subscribe(
          (info) => {
            this.toastr.success(
              'Emargency contact has been deleted',
              'Success'
            );
            this.getAllContacts();
          },
          (error) => {
            this.util.toast('error', 'Erro', 'Something went wrong');
          }
        );
      }
    });
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

  passwordFormValidation() {
    if (
      this.changePasswordForm.password != '' &&
      this.changePasswordForm.old_password != '' &&
      this.c_password != ''
    ) {
      this.password_validate = true;
    } else {
      this.password_validate = false;
    }
  }
}
