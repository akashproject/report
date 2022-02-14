import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders : any ;
  constructor(  
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.api
      .get('subscription/orders')
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            this.orders = [];
            
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
}
