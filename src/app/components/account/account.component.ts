import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'angular-bootstrap-md';
import { DateformatPipe } from '../../pipes/dateformat.pipe';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  mobile: any = '';
  @ViewChild('contactModal') public contactModal: ModalDirective;
  email: any = '';
  showOtp = false;
  hidden_otp_id: any = '';
  otp_value: any = '';
  isPlanExpired : number;
  orders : any ;
  contactForm: any = {
    id: '',
    name: '',
    email: '',
    mobile: '',
    address: '',
  };
  profileForm: any = {
    id: "",
    email: "",
    full_name: "",
    mobile: "",
    address: "",
  };
  myContacts: any = [];
  membershipPlan :any = "false";        

  changePasswordForm: any = {
    old_password: '',
    password: '',
  };
  c_password: any;
  isEmailVerified: any;
  isContactadded: any;
  currentDiv: any;
  form_validate = false;
  password_validate = false;
  contactform_validate = true;
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
    
    if (this.util.userInfo == '' || this.util.userInfo == null) {
      this.router.navigate(['/']);
    }
    
    if(localStorage.getItem('planId')){
      localStorage.removeItem('planId');
      this.router.navigate(['/payment']);
    }
    
    if(this.util.userInfo.expire_date){
      this.isPlanExpired = this.dateCompare(this.util.userInfo.expire_date);
    }
    
    this.isEmailVerified = this.util.userInfo.email_verified;

    this.isContactadded = this.util.userInfo.contact_added;
    if (this.util.userInfo.id) {
      this.getAllContacts();
    }
    this.profileForm.id = this.util.userInfo.id;
    this.profileForm.email = this.util.userInfo.email;
    this.profileForm.full_name = this.util.userInfo.full_name;
    this.profileForm.mobile = this.util.userInfo.mobile;
    this.profileForm.address = this.util.userInfo.address;


  }

  goTobusiness() {
    if(this.myContacts.length > 0){
      this.router.navigate(['/investments']);
    } else {
      this.toastr.error('Please add at least 1 emergency contact details', 'Error!');
      this.currentDiv = 4;
    }
    //
  }

  previewProfile() {
    this.currentDiv = 1;
  }

  gotoSubscription(){
    this.router.navigate(['/subscription']);
  }

  goToPayment(item) {
    localStorage.setItem('selectedPlan',JSON.stringify(item));
    this.router.navigate(['/payment']);
  }
  
  getAllOrders() {
    this.api
      .get('subscription/orders')
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            this.orders = [];
            this.currentDiv = 8;
            if(data.data.length !=undefined && data.data.length > 0){
              for (let i = 0; i < Object.keys(data.data).length; i++) {
                this.orders.push(data.data[i]);
              }
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

  gotoMembership() {
    if(this.util.userInfo.premium_membership == '1'){
      this.api.get('subscription/plan/').subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            this.membershipPlan = data.data;
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
    this.currentDiv = 7;
  }

  gotoPassword() {
    this.currentDiv = 3;
  }

  gotoContact() {
    this.currentDiv = 4;
  }

  getAllContacts() {
    let userdata: any = {
      
    };
    this.api
      .post('users/get_emergencycontact/',userdata)
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            this.myContacts = [];
            
            if(data.data.length !=undefined && data.data.length > 0){
              for (let i = 0; i < Object.keys(data.data).length; i++) {
                this.myContacts.push(data.data[i]);
              }
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
    this.router.navigate(['/emergency-contact']);
  }

  addnewInvestment(){
    this.router.navigate(['/create-investments']);
  }

  actionContact() {
    this.api.post('users/add_emergency', this.contactForm).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.contactModal.hide();
          this.toastr.success('Emergency contact has been updated', 'Success');
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
            this.hidden_otp_id = data.data;
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
    const param = {
      otp_value: this.otp_value,
      otp_id:this.hidden_otp_id
    };
    
    this.api.post('users/verifyLoginOtp', param).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.update();
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

  update() {
    this.api.post('users/edit_profile', this.profileForm).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.util.userInfo = data.data;
          this.currentDiv = 1;
          this.otp_value = "";
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
          this.currentDiv = 1;
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
    };
    this.api.post('users/getById', params).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.util.userInfo = data.data;
          this.currentDiv = 6;
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
        const param = {
          id: item.id,
        };
        this.util.start();
        this.api.post('users/deleteContact', param).subscribe(
          (info) => {
            this.toastr.success(
              'Emergency contact has been deleted',
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
     let re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (
      this.changePasswordForm.password != '' &&
      this.changePasswordForm.old_password != '' &&
      this.c_password != '' &&
      re.test(this.changePasswordForm.password) &&
      this.changePasswordForm.password == this.c_password
    ) {
      this.password_validate = true;
    } else {
      this.password_validate = false;
    }
  }

  contactFromValidation(){
      
    if (
      this.contactForm.name != '' &&
      this.contactForm.mobile != '' &&
      this.contactForm.address != ''
    ) {
      this.contactform_validate = true;
    } else {
      this.contactform_validate = false;
    }
  }

  verifyOtpToServer() {
    const param = {
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
  }

   dateCompare(dateSent) {
    let currentDate = new Date();
      dateSent = new Date(dateSent);
  
      return Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24));
  }

}
