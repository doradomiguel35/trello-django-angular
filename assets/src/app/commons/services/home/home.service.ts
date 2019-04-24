import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../../constants/global';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http: HttpClient) { }

  createBoardService(board){
      return this.http.post<any>(url+'board/create/', board).toPromise()
      .then(
          response => {
              console.log(response);
              return response;
          }
      )
      .catch(
          error => {
              console.log(error);
              return Promise.reject(error);
          }
      )
  }

}
