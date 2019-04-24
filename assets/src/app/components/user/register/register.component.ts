import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../../../commons/services/user/register/register.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm;
  errors;
    
  constructor(
    private http: HttpClient,
    private title: Title,
    private route: Router,
    private fb: FormBuilder,
    private register: RegisterService) { }

  ngOnInit() {

    this.title.setTitle('Register | Trello');
    
    this.registrationForm = this.fb.group({
        email : new FormControl('', [Validators.email, Validators.required]),
        first_name : new FormControl('', Validators.required),
        last_name : new FormControl('', Validators.required),
        password : new FormControl('', Validators.required),
        password2 : new FormControl('', Validators.required),
    });
  
  }

  get email(){
      return this.registrationForm.get('email');
  }

  get first_name(){
      return this.registrationForm.get('first_name');
  }

  get last_name(){
      return this.registrationForm.get('last_name');
  }

  get password(){
      return this.registrationForm.get('password');
  }

  get password2(){
      return this.registrationForm.get('password2');
  }

  registerUser(){
    this.register.registerService(this.registrationForm.value)
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
