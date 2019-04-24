import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../../commons/services/user/login/login.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent{
  loginForm;
  errors;

  constructor(
    private http: HttpClient,
    private title: Title,
    private login: LoginService,
    private route: Router,
    private fb: FormBuilder) { }

  ngOnInit(){
    this.title.setTitle('Login | Trello');
    this.loginForm = this.fb.group({
      email : new FormControl('', Validators.email),
      password : new FormControl('', Validators.required)
    });
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  loginUser(){
    this.login.loginService(this.loginForm.value)
    .then(
      response => {
         this.route.navigate([`/home/${response.id}/`]);
      }
    ) 
    .catch(
      error => {
        this.errors = error;
        console.log(this.errors);
      }
    )
  }

}
