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
      console.log(data.order);
      
    }
  })

  failure = ((data, error) => {
    alert(data.order.errorText)
  })
  orderData: any;

  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService,
    private element: ElementRef,
    private winRef: WindowRefService,

    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('routesource') == "register") {
      this.router.navigate(['/register']);
    } else if (this.util.userInfo == '' || this.util.userInfo == null) {
      this.router.navigate(['/login']);
    } else {
      this.createOrder()
    }
    
  }

  createOrder(){
    let planId = localStorage.getItem('planId');
    this.api
      .get('subscription/create-order/'+planId)
      .subscribe(
        (data: any) => {
          if (data && data.status === 200) {
            console.log(data.data);
            this.orderData = data.data;
            //this.payWithRazor(data.data.id);
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
      name: '', // company name or product name
      description: '',  // product description
      image: './assets/logo.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      console.log(response);
      console.log(options);
      this.updateRecivedPayment(response);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
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
  console.log("hi",dropConfig);
  cashfree.initialiseDropin(paymentDom, dropConfig);
  //Cashfree.initialiseDropin(this.element.nativeElement("paymentDom"), dropConfig);
 }


}
