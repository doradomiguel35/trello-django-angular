import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../../constants/global';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
   headers;
  constructor(private http: HttpClient) { }

  createBoardService(board){
      this.headers = new HttpHeaders();
      this.headers.append('Authorization', `Token ${localStorage.getItem('USER_TOKEN')}`);

      board['token'] = JSON.parse(localStorage.getItem('USER_TOKEN'));
      console.log(board);
      return this.http.post<any>(`${url}board/create/`, board, {headers: this.headers}).toPromise()
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

  getBoardsService(id){
    return this.http.get(`${url}board/view/${id}/`).toPromise()
    .then(
        response => {
            console.log(response);
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
