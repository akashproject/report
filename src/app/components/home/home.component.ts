import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	
	form_validate = false;
	contactForm: any = {
		name: '',
		email: '',
		mobile: '',
		age: '',
		service: '',
		state: '',
		message: '',
	  };
	  
	  
	constructor(private router: Router,private api: ApiService,public util: UtilService,private toastr: ToastrService) {
		
	}

  ngOnInit(): void {
    localStorage.clear();
    this.util.userInfo = null;
  }

  getGateWaySettings(){
    this.api.get('get-gateway-settings').subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          environment.gatewayAuthKey = data.data;
        } else if (data && data.status === 500) {
        } else {
        }
      },
      (error) => {
      }
    );
  }
  
  contactus(){
	  this.api.post('users/contact-us', this.contactForm).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          this.toastr.success('Thank you for Reaching out! We will get back to you shortly', 'Success');
        } else if (data && data.status === 500) {
          this.toastr.error(data.data.error, 'Error!');
        } else {
          this.toastr.error('Something went wrong', 'Error!');
        }
      },
      (error) => {
        this.toastr.error('Something went wrong', 'Error!');
      }
    );  
  }

  gotoSubscription(){
    localStorage.setItem('routesource','register');
    this.router.navigate(['/subscription']);
  }

	formValidation() {
		if (this.contactForm.name != '' && this.contactForm.age != '' && this.contactForm.mobile != '' && this.contactForm.email != '' && this.contactForm.message != '') {
		  this.form_validate = true;
		} else {
		  this.form_validate = false;
		}
	  }
}
