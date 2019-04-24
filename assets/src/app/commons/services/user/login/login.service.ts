import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../../../constants/global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  headers;
  constructor(private http: HttpClient) { }

  loginService(user){ 
  	// Service for authenticating user credentials in the backend, once authentication
  	// is successful, a token will be returned, store it in the local storage to give 
  	// the logged in user access to some pages.
    console.log(user);
  	return this.http.post<any>(url+'users/login/', user).toPromise()
  	.then(
  		response => {
  			this.setToken(response);
  			return response;
  		}
  	)
  	.catch(
  		error => {
  			console.log(error);
  			return Promise.reject(error);
  		}
  	);
  }

  setToken(token){ // Store token in local storage
  	localStorage['USER_TOKEN'] = JSON.stringify(token);
  }

  getToken(){ // Get token from local storage
    return JSON.parse(localStorage.getItem('USER_TOKEN')).token;
  }

}
