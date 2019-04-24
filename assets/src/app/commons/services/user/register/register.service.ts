import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../../../constants/global';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerService(user){
  	return this.http.post<any>(url+'users/register/', user).toPromise()
  	.then(
  		response => {
  			this.setToken(response);
  			return response;
  		}
  	)
  	.catch(
  		error => {
  			return Promise.reject(error);
  		}
  	)
  }

  setToken(token){ // Store token in local storage
	localStorage['USER_TOKEN'] = JSON.stringify(token);
  }



}
