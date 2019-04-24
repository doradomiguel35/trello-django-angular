import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HomeService } from '../../commons/services/home/home.service';
import { Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ HomeService ]
})

export class HomeComponent implements OnInit {
  closeResult: string;
  boardForm;

  constructor(
  	private titlePage: Title,
  	private modalService: NgbModal,
    private fb: FormBuilder,
    private homeService: HomeService,
    private route: Router) { }

  ngOnInit() {
  	this.titlePage.setTitle('Home | Trello')

    this.boardForm = this.fb.group({
      title : new FormControl('', Validators.required),
      description : new FormControl(''),
      visibility : new FormControl('', Validators.required)
    });

  }

  get title(){
    return this.boardForm.get('title');
  }

  get description(){
    return this.boardForm.get('description');
  }  

  get visibility(){
    return this.boardForm.get('visibility');
  }

  createBoard(){
    this.homeService.createBoardService(this.boardForm.value)
    .then(
       response => {
         // this.route.navigate([])
         console.log(response);
         return response;
       }
    )
    .catch(
       error => {
         console.log(error);
         return error;
       }
    )
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
