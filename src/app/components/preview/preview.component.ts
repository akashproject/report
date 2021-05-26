import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'angular-bootstrap-md';
import {NgbDateStruct, NgbCalendar,NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  isEmailVerified: any;
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
  profileForm: any = {
    id: this.util.userInfo.id,
    full_name: this.util.userInfo.full_name,
    address: this.util.userInfo.address,
  };
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService,
    private calendar: NgbCalendar
  ) {
  }

  ngOnInit(): void {
    this.getInvestmentsRecords();
  }

  getInvestmentsRecords() {
    this.api
      .get('investments/get-investment-records/' + this.util.userInfo.id)
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            this.investmentsForm = data.data;
            console.log(this.investmentsForm.user.pan);
            
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
}
