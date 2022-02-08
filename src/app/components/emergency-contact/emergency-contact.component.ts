import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.scss'],
})
export class EmergencyContactComponent implements OnInit {
  contactForm: any = {
    id: '',
    user_id: this.util.userInfo.id,
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

  isEmailVerified: any;
  currentDiv: any;
  form_validate = false;

  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService
  ) {
    this.profileForm.full_name = this.util.userInfo.full_name;
  }

  ngOnInit(): void {}

  update() {
    this.api.post('users/add_emergency', this.contactForm).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          // localStorage.setItem('user', JSON.stringify(data.data));
          this.util.userInfo.contact_added = true;
          this.toastr.success('Emergency contact has been inserted', 'Success');
          this.router.navigate(['/emergency-list']);
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

  openProfile() {
    this.router.navigate(['/account']);
  }

  goTobusiness() {
    this.router.navigate(['/account']);
  }

  gotoPassword() {
    this.router.navigate(['/account']);
  }

  gotoContact() {
    this.router.navigate(['/account']);
  }

  logout() {
    localStorage.clear();
    this.util.userInfo = null;
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  formValidation() {
    let mobile = new String(this.contactForm.mobile);

      if (
        this.contactForm.name != '' &&
        this.contactForm.mobile != '' &&
        mobile.length == 10
      ) {
      this.form_validate = true;
    } else {
      this.form_validate = false;
    }
  }
}
