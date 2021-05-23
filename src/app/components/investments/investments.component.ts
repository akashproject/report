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
    user:{
      pan: '',
      adhaar: ''
    },
    company: [],
    med_policy: [],
    insurance: [],
    vehicle_insurance: [],
    fire_insurance: [],
    bank_account: [],
    fixed_deposit: [],
    shared_bonds: [],
    locker_details: [],
    public_provident_fund: [],
    uan_details:[],
    nps_account:[],
    other_investments:[],
    loans:[],
  };
  isEmailVerified: any;
  currentDiv: any;
  form_validate = false;
  verify_assword : any = false;

  verifyPasswordForm: any = {
    id: this.util.userInfo.id,
    password: '',
  };
  password_validate = false;
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService,
    private calendar: NgbCalendar
  ) {
    this.currentDiv = 16;
  }

  ngOnInit(): void {
    if (this.util.userInfo == '') {
      this.router.navigate(['/']);
    }

    this.isEmailVerified = this.util.userInfo.email_verified;
    console.log(this.util.userInfo);

    this.getUserRecords();
    this.getInvestmentsRecords();
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

  getInvestmentsRecords() {
    this.api
      .get('investments/get-investment-records/' + this.util.userInfo.id)
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

  addVehicleInsurancePolicy() {
    let vehicleInsurancePolicy = {
      policy_no: '',
      sum_insured: '',
      nominee_name: '',
      maturity_date: '',
    };
    this.investmentsForm.vehicle_insurance.push(vehicleInsurancePolicy);
  }

  addFireInsurancePolicy() {
    let fireInsurancePolicy = {
      property_insured: '',
      policy_no: '',
      sum_insured: '',
      maturity_date: '',
      risks_covered: '',
    };
    this.investmentsForm.fire_insurance.push(fireInsurancePolicy);
  }

  addBankAccount() {
    let bankAccount = {
      bank_name: '',
      full_branch_address: '',
      nominee_name:'',
      account_type: '',
      last_four_digt: '',
      account_number: '',
      banker_name: '',
      banker_contact: '',
    };
    this.investmentsForm.bank_account.push(bankAccount);
  }

  addFixedDeposit() {
    let fixedDeposit = {
      bank_name: '',
      full_branch_address: '',
      nominee_name:'',
      account_type: '',
      last_four_digt: '',
      account_number: '',
    };
    this.investmentsForm.fixed_deposit.push(fixedDeposit);
  }

  addSharedBonds() {
    let sharedBonds = {
      company_name: '',
      type: '',
      units_hold:'',
      demat_number: '',
      demat_provider_name: '',
      demat_provider_contact_no: '',
    };
    this.investmentsForm.shared_bonds.push(sharedBonds);
  }

  addlockerDetails() {
    let lockerDetails = {
      bank_name: '',
      full_branch_address: '',
      nominee_name:'',
      locker_name: '',
      locker_number: '',
    };
    this.investmentsForm.locker_details.push(lockerDetails);
  }

  addPpfDetails() {
    let publicProvidentFund = {
      bank_name: '',
      full_branch_address: '',
      nominee_name:'',
      account_number: '',
    };
    this.investmentsForm.public_provident_fund.push(publicProvidentFund);
  }

  addUan() {
    let uan = {
      uan_number: '',
      nominee_name:'',
    };
    this.investmentsForm.uan_details.push(uan);
  }

  addNpsAccount() {
    let nps = {
      nps_account_number: '',
      nominee_name:'',
    };
    this.investmentsForm.nps_account.push(nps);
  }

  addOtherInvestments() {
    let otherInvestments = {
      description: '',
      account_number: '',
      bank_name: '',
      full_branch_address: '',
      nominee_name:'',
    };
    this.investmentsForm.other_investments.push(otherInvestments);
  }

  addLoans() {
    let loans = {
      loan_type: '',
      bank_name: '',
      account_number: '',   
      full_branch_address: '',
      amount:'',
      loaninsured:'',
      insurance_no:''
    };
    this.investmentsForm.loans.push(loans);
  }

  openProfile() {
    this.router.navigate(['/account']);
  }

  publishInvestmentRecords(){
    this.investmentsForm.user.pan = this.profileForm.pan_no;
    this.investmentsForm.user.adhaar = this.profileForm.adhaar_no;
    this.api.post('investments/publish-investment-records/' + this.util.userInfo.id, this.investmentsForm).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          console.log(data);
          this.toastr.success('Information has been updated', 'Success');
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

  verifyPassword(){
    console.log(this.verifyPasswordForm.password);
    this.api.post('users/verifyPassword', this.verifyPasswordForm).subscribe(
      (data: any) => {
        if (data && data.status == '200') {
          this.verify_assword = true;
          this.currentDiv = 1;
        } else if (data && data.status == '500') {
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

  removeElement(params, item) {
    this.investmentsForm[params].splice(item, 1);
  }

  formValidation(currentDiv) {
    if(this.verify_assword != true) {
      this.currentDiv = 16;
    } else {
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
      if(requiredClass.length <= 0){
        this.publishInvestmentRecords()
        this.currentDiv = currentDiv;
      } else {
        return false;
      }
   }
 
  }

  passwordFormValidation(){
    if (
      this.verifyPasswordForm.password != '' 
    ) {
      this.password_validate = true;
    } else {
      this.password_validate = false;
    }
  }
}
