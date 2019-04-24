import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { LoginService} from '../user/login/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenService implements HttpInterceptor{
  token;

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable <HttpEvent<any>>{		
  	let tokenService = this.injector.get(LoginService);
  	this.token = tokenService.getToken();
  	
  	let request = req.clone({
  		setHeaders:{
  		  	Authorization: `Token ${this.token}`
  		}
  	});
  	return next.handle(request);

  }
}
