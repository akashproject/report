import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'angular-bootstrap-md';
import {NgbDateStruct, NgbCalendar,NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss'],
})
export class InvestmentsComponent implements OnInit {
  mobile: any = '';
  @ViewChild('contactModal') public contactModal: ModalDirective;
  @ViewChild('datePicker') datePicker: NgbDatepicker;
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
    insurance: [],
  };
  isEmailVerified: any;
  currentDiv: any;
  form_validate = false;
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService,
    private calendar: NgbCalendar
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
    this.formValidation(2)
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
  }

  addInsurancePolicy() {
    let insurancePolicy = {
      policy_no: '',
      policy_holder_ame: '',
      nominee_name: '',
      insurance_agent_name: '',
      insurance_agent_contact_no: '',
      maturity_date: '',
    };
    this.investmentsForm.insurance.push(insurancePolicy);
  }

  gotToMedPolicy() {
    this.formValidation(3)
  }

  gotToInsurancePolicy() {
    this.formValidation(4)
  }

  gotToVehicleInsurancePolicy() {
    this.formValidation(5)
  }

  openProfile() {
    this.router.navigate(['/account']);
  }

  removeElement(params, item) {
    this.investmentsForm[params].splice(item, 1);
  }

  formValidation(currentDiv) {
    let requiredElements = document.getElementById("required_check").querySelectorAll("[required]");
    console.log(requiredElements);
    for (var i = 0; i < requiredElements.length; i++) {
      var e = requiredElements[i];
      console.log(requiredElements[i]);
      console.log("here");
      if(!e.getAttribute("ng-reflect-model")){
        e.setAttribute("class", "form-control required");
        console.log("here");     
      } else {
        e.setAttribute("class", "form-control");
      }
    }

         
    let requiredClass = document.getElementById("required_check").querySelectorAll(".required");
    console.log(requiredClass);
    if(requiredClass.length <= 0){
      this.currentDiv = currentDiv;
    } else {
      return false;
    }

  }
}
