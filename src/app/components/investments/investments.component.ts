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
  profileForm: any = {
    id: this.util.userInfo.id,
    full_name: this.util.userInfo.full_name,
    address: this.util.userInfo.address,
    pan_no: '',
    adhaar_no: '',
  };
  emContacts: any = [];
  investmentsForm: any = {
    company: [],
    med_policy: [],
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
    this.currentDiv = 1;
  }

  ngOnInit(): void {
    if (this.util.userInfo == '') {
      this.router.navigate(['/']);
    }

    this.isEmailVerified = this.util.userInfo.email_verified;
    console.log(this.util.userInfo);

    this.getUserRecords();
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

  gotToCompanyDetails() {
    this.currentDiv = 2;
  }

  parsonalDetails() {
    this.currentDiv = 1;
    console.log(this.emContacts);
  }

  addNewCompany() {
    let company = {
      supervisor_name: '',
      supervisor_contact_no: '',
      office_friend_name: '',
      office_friend_contact_no: '',
      hr_name: '',
      hr_contact_no: '',
    };
    this.investmentsForm.company.push(company);
    console.log(this.investmentsForm);
  }

  addMedPolicy() {
    let medPolicy = {
      policy_no: '',
      previous_policy_no: '',
      persons_who_are_covered: '',
      sum_insured: '',
      renewal_date: '',
    };
    this.investmentsForm.med_policy.push(medPolicy);
    console.log(this.investmentsForm);
  }

  gotToMedPolicy() {
    this.currentDiv = 3;
    console.log(this.investmentsForm);
  }

  gotToInsurancePolicy() {
    console.log(this.investmentsForm);
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
