import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../../constants/global';

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  constructor(private http: HttpClient) { }

  getListService(board_id){
  	return this.http.get(`${url}board/lists/${board_id}/`).toPromise()
  	.then(
  		response => {
  			return response;
  		}
  	)
  	.catch(
  		error => {
  			return Promise.reject(error);
  		}
  	)
  }

  getBoardDetailService(board_id){
  	return this.http.get(`${url}board/view/main/${board_id}/`).toPromise()
  	.then(
  		response => {
  			return response;
  		}
  	)
  	.catch(
  		error => {
  			return Promise.reject(error);
  		}
  	)
  } 
}
