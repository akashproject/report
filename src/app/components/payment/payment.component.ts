import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import { WindowRefService } from '../../services/window-ref.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
//import { Cashfree } from '../../../assets/js/cashfree';
//const cashfree = new Cashfree();
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
    console.log(this.membershipPlan);
    
    let planParams : any = {
      'plan_id':this.membershipPlan.id,
      'order_amount':this.amount
    }
    if(this.couponData){
      planParams.coupon_id = this.couponData.id
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
    this.amount = this.membershipPlan.price;
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
            this.toastr.success('Payment Recived! Your Premium menbership has been activated', 'Success!');
            localStorage.removeItem("planId");   
            this.util.userInfo = data.data;         
            Swal.fire({
              title: 'Payment Recived!',
              text: 'Your Premium menbership has been activated',
              icon: 'success',
              showConfirmButton: true,
              confirmButtonText: 'Okay',
              backdrop: false,
              background: 'white',
            }).then((status) => {
              this.router.navigate(['/account']);
            });
            
          } else if (data && data.status === 500) {
            this.toastr.error(data.data.message, 'Error!');
            Swal.fire({
              title: 'Payment Failure',
              text: "Sorry for inconvenience! Please contact us on 9903038282",
              icon: 'error',
              showConfirmButton: true,
              confirmButtonText: 'Okay',
              backdrop: false,
              background: 'white',
            }).then((status) => {
              this.router.navigate(['/account']);
            });
          } else {
            Swal.fire({
              title: 'Payment Failure',
              text: "Sorry for inconvenience! Please contact us on 9903038282",
              icon: 'error',
              showConfirmButton: true,
              confirmButtonText: 'Okay',
              backdrop: false,
              background: 'white',
            }).then((status) => {
              this.router.navigate(['/account']);
            });
          }
        },
        (error) => {
          Swal.fire({
            title: 'Payment Failure',
            text: "Sorry for inconvenience! Please contact us on 9903038282",
            icon: 'error',
            showConfirmButton: true,
            confirmButtonText: 'Okay',
            backdrop: false,
            background: 'white',
          }).then((status) => {
            this.router.navigate(['/account']);
          });
        }
      );
  }

  createRzpayOrder() {
    // call api to create order_id
    this.payWithRazor(this.orderData.id);
  }

  payWithRazor(val) {
    const options: any = {
      key: environment.gatewayAuthKey,
      amount: this.amount+"00", // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Conjugation', // company name or product name
      description: 'Ensure your investments are claimed in your absence',  // product description
      image: './assets/images/logo_rz.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      "prefill": {
        "name": this.util.userInfo.full_name,
        "email": this.util.userInfo.email,
        "contact": this.util.userInfo.mobile
      },
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        "address": "Conjugation Corporate Office"
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


  // render() {
  //   const dropConfig = {
  //     "components": [
  //         "order-details",
  //         "card",
  //         "netbanking",
  //         "app",
  //         "upi-collect",
  //         "upi-intent"
  //     ],
  //     "orderToken": "TXLUrFb7IdOFW2DjGGVa",
  //     "onSuccess":this.success,
  //     "onFailure": this.failure,
  //     "style": {
  //         "backgroundColor": "#ffffff",
  //         "color": "#11385b",
  //         "fontFamily": "Lato",
  //         "fontSize": "14px",
  //         "errorColor": "#ff0000",
  //         "theme": "light", //(or dark)
  //     }
  //   }
  // cashfree.initialiseDropin(paymentDom, dropConfig);
  // //Cashfree.initialiseDropin(this.element.nativeElement("paymentDom"), dropConfig);
  // }


}
