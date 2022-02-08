import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'angular-bootstrap-md';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  plans: any = [];
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
    this.getAllPlans();
  }

  getAllPlans() {
    this.api
      .get('subscription/plans')
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            this.plans = [];
            
            if(data.data.length !=undefined && data.data.length > 0){
              for (let i = 0; i < Object.keys(data.data).length; i++) {
                this.plans.push(data.data[i]);
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

  goToPayment(item) {
    localStorage.setItem('planId',item.id);
    localStorage.setItem('selectedPlan',JSON.stringify(item));
    console.log(localStorage.getItem('selectedPlan'));
    
    this.router.navigate(['/payment']);
  }

}
