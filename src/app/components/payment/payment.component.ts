import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import { WindowRefService } from '../../services/window-ref.service';
import { ToastrService } from 'ngx-toastr';
import { Cashfree } from '../../../assets/js/cashfree';
const cashfree = new Cashfree();
const paymentDom = document.getElementById("payment-form")
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [WindowRefService]
})
export class PaymentComponent implements OnInit {
  //@ViewChild('paymentDom', { static: true }) paymentDom: ElementRef;
 
  success = ((data, error) => {
    if (data.order && data.order.status == "PAID") {
      
    }
  })

  failure = ((data, error) => {
    alert(data.order.errorText)
  })
  orderData: any;
  membershipPlan:any;
  couponCode:any;
  couponData:any;
  amount:any;
  isLoading: any = false;
  x_timer:any;
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService,
    private element: ElementRef,
    private winRef: WindowRefService,

    ) { 
      
    }

  ngOnInit(): void {
    if(localStorage.getItem('routesource') == "register") {
      this.router.navigate(['/register']);
    } else if (this.util.userInfo == '' || this.util.userInfo == null) {
      this.router.navigate(['/login']);
    }
    this.membershipPlan = JSON.parse(localStorage.getItem('selectedPlan'));    
    this.amount = this.membershipPlan.price;
  }

  createOrder(){
    let planParams : any = {
      'plan_id':localStorage.getItem('planId'),
      'coupon_id':this.couponData.id,
      'order_amount':this.amount
    }
    this.api
      .post('subscription/create-order/',planParams)
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            this.orderData = data.data;
            //this.payWithRazor(data.data.id);
            this.createRzpayOrder();
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

  couponValidation(){
    if (this.couponCode) {
      this.isLoading = true;   
      clearTimeout(this.x_timer);
      this.x_timer = setTimeout(() => {
        this.getCouponByCode()
      }, 3000); 
    }
  }

  getCouponByCode(){
    let options: any = {
      coupon: this.couponCode
    }
    this.api.post('subscription/coupon-code/',options)
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            this.isLoading = false;
            this.toastr.success('Coupon Applied.', 'Great!');
            this.couponData = data.data;
            this.amount = this.amount - data.data.offer_price;
          } else if (data && data.status === 500) {
            this.isLoading = false;
            this.toastr.error(data.data.message, 'Error!');
          } else {
            this.isLoading = false;
            this.toastr.error('Something went wrong', 'Error!');
          }
        },
        (error) => {
          this.toastr.error('Something went wrong', 'Error!');
        }
      );
  }

  updateRecivedPayment(params){
    this.api
      .post('subscription/recived-payment/',params)
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            this.toastr.success(data.data, 'Success!');
            localStorage.removeItem("planId");            
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

  createRzpayOrder() {
    // call api to create order_id
    this.payWithRazor(this.orderData.id);
  }

  payWithRazor(val) {
    const options: any = {
      key: 'rzp_test_lR38QPQGgGfLYD',
      amount: 125500, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Conjugation', // company name or product name
      description: 'Ensure your investments are claimed in your absence',  // product description
      image: './assets/images/logo.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0e226a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      this.updateRecivedPayment(response);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }


 render() {
    const dropConfig = {
      "components": [
          "order-details",
          "card",
          "netbanking",
          "app",
          "upi-collect",
          "upi-intent"
      ],
      "orderToken": "TXLUrFb7IdOFW2DjGGVa",
      "onSuccess":this.success,
      "onFailure": this.failure,
      "style": {
          "backgroundColor": "#ffffff",
          "color": "#11385b",
          "fontFamily": "Lato",
          "fontSize": "14px",
          "errorColor": "#ff0000",
          "theme": "light", //(or dark)
      }
  }
  cashfree.initialiseDropin(paymentDom, dropConfig);
  //Cashfree.initialiseDropin(this.element.nativeElement("paymentDom"), dropConfig);
 }


}
