import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { randomString } from '../../../commons/constants/global';
import { BoardService } from '../../../commons/services/board/board.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [ BoardService ]
})
export class BoardComponent implements OnInit {
  closeResult: string;
  lists;
  board_details;

  constructor(
    private location: Location,
    private active: ActivatedRoute,
    private boardService: BoardService,
    private modalService: NgbModal,) { }

  ngOnInit() {    
    this.getLists();
    this.getBoardDetails();    
  }

  getLists(){
    let board_id = this.active.snapshot.paramMap.get('boardId');
    this.boardService.getListService(board_id)
    .then(
        response => {
            this.lists = response;
            console.log(this.lists);
            return response;
        }
    )
    .catch(
        error => {
            return error;
        }
    )
  }

  getBoardDetails(){
      let board_id = this.active.snapshot.paramMap.get('boardId');
      this.boardService.getBoardDetailService(board_id)
      .then(
          response => {
              this.board_details = response;
              return response;
          }
       )
      .catch(
          error => {
              return error;
          }
      )
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-create-list'}).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    }, 
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } 

    else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } 

    else {
      return  `with: ${reason}`;
    }
  }

  drop(event: CdkDragDrop<string[]>) { // CONNECTED SORTABLE FOR CARDS
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}

