import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UtilService } from './util.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: any = '';
  mediaURL: any = '';
  constructor(private http: HttpClient,private util: UtilService) {
    this.baseUrl = environment.baseURL;
    this.mediaURL = environment.mediaURL;
  }

  alerts(title, message, type) {
    Swal.fire(title, message, type);
  }

  uploadFile(files: File[]) {
    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append('userfile', f));
    return this.http.post(this.baseUrl + 'users/upload_image', formData);
  }

  getCurrencyCode() {
    return environment.general.code;
  }

  getCurrecySymbol() {
    return environment.general.symbol;
  }


  JSON_to_URLEncoded(element, key?, list?) {
    let new_list = list || [];
    if (typeof element === 'object') {
      for (let idx in element) {
        this.JSON_to_URLEncoded(
          element[idx],
          key ? key + '[' + idx + ']' : idx,
          new_list
        );
      }
    } else {
      new_list.push(key + '=' + encodeURIComponent(element));
    }
    return new_list.join('&');
  }

  post(url, body) {
    let token = 'scriptcrown';
    if(this.util.userInfo) {
      token = this.util.userInfo.token;
    }
    
    const header = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .set('Token', token),
    };
    const param = this.JSON_to_URLEncoded(body);
    return this.http.post(this.baseUrl + url, param, header);
  }

  filepost(url, post) {
    let token = 'scriptcrown';
    if(this.util.userInfo) {
      token = this.util.userInfo.token;
    }
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Token', token),
    };
    return this.http.post(
      'https://api.circlepoint.in/index.php/' + url,
      post,
      header
    );
  }

  externalPost(url, body, key) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('X-Api-Key', `Bearer ${key}`),
    };
    const order = this.JSON_to_URLEncoded(body);
    return this.http.post(url, order, header);
  }

  externalPost2(url, body) {
    const header = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    const order = this.JSON_to_URLEncoded(body);
    return this.http.post(url, order, header);
  }

  instaPay(url, body, key, token) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('X-Api-Key', key)
        .set('X-Auth-Token', token),
    };
    const order = this.JSON_to_URLEncoded(body);
    return this.http.post(url, order, header);
  }
  
  get(url) {
    let token = environment.authToken;
    if(this.util.userInfo) {
      token = this.util.userInfo.token;
    }
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Token', token),
    };
    return this.http.get(this.baseUrl + url, header);
  }

  externalGet(url) {
    return this.http.get(url);
  }

  httpGet(url, key) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${key}`),
    };

    return this.http.get(url, header);
  }
}
