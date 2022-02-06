import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import { ToastrService } from 'ngx-toastr';
declare const Cashfree;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild("paymentForm") div: ElementRef;
  success = ((data, error) => {
    if (data.order && data.order.status == "PAID") {
      alert("Order is PAID")
      //order is paid
      //verify order status by making an API call using your server to cashfree's server
      console.log(data.order);
    } else {
        //order is still active
        alert("Order is ACTIVE")
    } 
  })

  failure = ((data, error) => {
    alert(data.order.errorText)
  })

  orderData: any = {"cf_order_id":2134630,"order_id":"order_12314224hlamCRG78RPabkMJ1g5ysjgdr","entity":"order","order_currency":"INR","order_amount":1000,"order_expiry_time":"2022-03-08T01:22:44+05:30","customer_details":{"customer_id":"cust_eb1u4S8UZo","customer_name":"Test","customer_email":"asdadad@dasad.cc","customer_phone":"6589774411"},"order_meta":{"return_url":null,"notify_url":null,"payment_methods":null},"settlements":{"url":"https:\/\/sandbox.cashfree.com\/pg\/orders\/order_12314224hlamCRG78RPabkMJ1g5ysjgdr\/settlements"},"payments":{"url":"https:\/\/sandbox.cashfree.com\/pg\/orders\/order_12314224hlamCRG78RPabkMJ1g5ysjgdr\/payments"},"refunds":{"url":"https:\/\/sandbox.cashfree.com\/pg\/orders\/order_12314224hlamCRG78RPabkMJ1g5ysjgdr\/refunds"},"order_status":"ACTIVE","order_token":"TXLUrFb7IdOFW2DjGGVa","order_note":null,"payment_link":"https:\/\/payments-test.cashfree.com\/order\/#TXLUrFb7IdOFW2DjGGVa","order_tags":null,"order_splits":[]};

  paymentForm: any = {
    appId: '123142bc881f64ee8a6bb906fc241321',
    orderId: 'TXLUrFb7IdOFW2DjGGVa',
    orderAmount: '1000',
    orderCurrency: 'INR',
    customerName: 'Test',
    customerEmail: 'asdadad@dasad.cc',
    customerPhone: '6589774411',
    returnUrl: 'https://npconjug.co.in/checkout/response.php',
  };
 

  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    console.log(this.orderData);
    
    // if(localStorage.getItem('routesource') == "register") {
    //   this.router.navigate(['/register']);
    // } else if (this.util.userInfo == '' || this.util.userInfo == null) {
    //   this.router.navigate(['/login']);
    // } else {
    //   this.createOrder()
    // }
    
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
  
  Cashfree.initialiseDropin(this.paymentForm, dropConfig);
 }

}
