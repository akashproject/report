import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emargency-contact',
  templateUrl: './emargency-contact.component.html',
  styleUrls: ['./emargency-contact.component.scss'],
})
export class EmargencyContactComponent implements OnInit {
  contactForm: any = {
    id: '',
    user_id: this.util.userInfo.id,
    name: '',
    email: '',
    mobile: '',
    address: '',
  };

  isEmailVerified: any;
  currentDiv: any;
  form_validate = false;

  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  update() {
    console.log(this.contactForm);
    this.api.post('users/add_emargency', this.contactForm).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          // localStorage.setItem('user', JSON.stringify(data.data));
          this.util.userInfo.contact_added = true;
          this.toastr.success('Emargency contact has been inserted', 'Success');
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
    console.log(this.contactForm);
    if (this.contactForm.mobile != '' || this.contactForm.email != '') {
      this.form_validate = true;
    } else {
      this.form_validate = false;
    }
  }
}
