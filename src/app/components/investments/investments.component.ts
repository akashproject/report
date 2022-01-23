import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'angular-bootstrap-md';
import {NgbDateStruct, NgbCalendar,NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {DateformatPipe} from '../../pipes/dateformat.pipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss'],
  providers: [ DateformatPipe ]
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
    mutual_funds: [],
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
  model: NgbDateStruct;
  date: { year: number, month: number };
  verifyPasswordForm: any = {
    id: this.util.userInfo.id,
    password: '',
  };
  password_validate = false;
  bsValue = new Date();
  baseUrl: any = '';
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService,
    private calendar: NgbCalendar,
    private http: HttpClient
  ) {
    this.currentDiv = 16;
    this.dpConfig.dateInputFormat = 'DD/MM/YY';
    localStorage.removeItem("verify_assword");
    this.baseUrl = environment.baseURL;
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  setCurrent() {
    //Current Date
    this.datePicker.navigateTo()
  }
  setDate() {
    //Set specific date
    this.datePicker.navigateTo({ year: 2013, month: 2 });
  }

  navigateEvent(event) {
    console.log("event date",event.target.value);
    
    return event.target.value;
  }

  ngOnInit(): void {
    if (this.util.userInfo == '') {
      this.router.navigate(['/']);
    } else {
      this.isEmailVerified = this.util.userInfo.email_verified;
      this.getUserRecords();
      this.getInvestmentsRecords();
    }
  }

  getUserRecords() {
    let userdata: any = {
      mobile: this.util.userInfo.mobile,
      password: this.util.userInfo.password,
    };
    this.api
      .post('investments/get_user_records',userdata)
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            this.emContacts = [];
            for (let i = 0; i < Object.keys(data.data).length; i++) {
              this.emContacts.push(data.data[i]);
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

  getInvestmentsRecords() {
    let userdata: any = {
      mobile: this.util.userInfo.mobile,
      password: this.util.userInfo.password,
    };
    this.api
      .post('investments/get_investment_records',userdata)
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {  
     
            if(data.message == "Success") {
              this.investmentsForm = data.data;
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
  }

  addMutualFunds() {
    let mutualFunds = {
      folio_no: '',
      bank_name: '',
      agent_name: '',
      agent_no: '',
    };
    console.log(mutualFunds);
    console.log(this.investmentsForm.mutual_funds);
    
    this.investmentsForm.mutual_funds.push(mutualFunds);
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
      policy_company_name: '',
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
      insurance_company_name: '',
      renewal_date: '',
    };
    this.investmentsForm.vehicle_insurance.push(vehicleInsurancePolicy);
  }

  addFireInsurancePolicy() {
    let fireInsurancePolicy = {
      property_insured: '',
      policy_no: '',
      sum_insured: '',
      renewal_date: '',
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
      bank_name_or_company_name: '',
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
      holding_company_name: '',
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

  previewRecords(){
    this.api.get('investments/export-to-csv/' + this.util.userInfo.id).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.router.navigate(['/preview']);
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

  changedateformat(event) {
    console.log(event);
    
  }
  publishInvestmentRecords(){
    console.log("investements ",this.investmentsForm);
    
    this.api.post('investments/publish-investment-records/' + this.util.userInfo.id, this.investmentsForm).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
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
    this.api.post('users/verifyPassword', this.verifyPasswordForm).subscribe(
      (data: any) => {
        if (data && data.status == '200') {
          this.verify_assword = true;
          localStorage.setItem('verify_assword', this.verify_assword);
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

  formValidation(currentDiv,allowSave:any = true) {
    
    if(this.verify_assword != true) {
      this.currentDiv = 16;
    } else {
      let requiredElements = document.getElementById("required_check").querySelectorAll("[required]");
      for (var i = 0; i < requiredElements.length; i++) {
        var e = requiredElements[i];
        
        if(!(<HTMLInputElement>e).value){
          e.setAttribute("class", "form-control required");
        } else {
          e.setAttribute("class", "form-control");
        }
      }

          
      let requiredClass = document.getElementById("required_check").querySelectorAll(".required");
      if(requiredClass.length <= 0){
        if(allowSave) {
          this.publishInvestmentRecords()
        }
        
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

  todate(dob){
    if (dob) {
      const [year, month, day] = dob.split('-');
      const obj = { year: parseInt(year), month: parseInt(month), day: 
        parseInt(day.split(' ')[0].trim()) };
       return obj;
      }
    return dob;
  }
   
  post(url, body) {
    const header = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    const data=JSON.stringify(body);
    
    return this.http.post(this.baseUrl + url, data, header);
  }

}
