import { Component, OnInit } from '@angular/core';
import {HelperService} from '../helper.service';
import {Hero} from './hero';
import {NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {LoggerService} from '../logs/logger.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-hero-component',
  templateUrl: './hero-component.component.html',
  styleUrls: ['./hero-component.component.css']
})
export class HeroComponentComponent implements OnInit {
  closeResult:string= '';
  Heroes = [];
  modalRef:NgbModalRef;
  selectedHeroes:string[] = [];
  copyHeroes:Hero[] = [];
  sortField:string = 'Name';
  searchText:string = '';
  sortDirection:string = 'asc';

  constructor(private helperService:HelperService,
    private modalService:NgbModal,private logger: LoggerService) { }
  powers = ["Nothing","Anything","Sleeping","Eating"]; //list on powers
  model = new Hero("","","");
  ngOnInit() {
    this.selectedHeroes = [];
    console.log("new random number ",this.helperService.getRandomNumber());
    this.Heroes = localStorage.getItem("Heroes") ? JSON.parse(localStorage.getItem("Heroes")) : [];
    console.log(this.Heroes);

    //LOG TEST SECTION STARTS
    // Incorrect source file name and line number :(
      this.logger.invokeConsoleMethod( 'info', 'AppComponent: logger.invokeConsoleMethod()');
      // this.logger.invokeConsoleMethod( 'warn', 'AppComponent: logger.invokeConsoleMethod()');
      // this.logger.invokeConsoleMethod( 'error', 'AppComponent: logger.invokeConsoleMethod()');

      // // Correct source file name and line number :)
       this.logger.info('AppComponent: logger.info()');
      // this.logger.warn('AppComponent: logger.warn()');
      // this.logger.error('AppComponent: logger.error()');
    //LOG TEST SECTION ENDS

    //Get Demo heroes

    this.helperService.getHeroes(res =>{
      console.log("Heroes ",res);
      for(let item of res.Data){
        this.Heroes.push(item);
      }
    },err=> {

    });
  }

  //get data when we are done
  get diagnostic(){ return JSON.stringify(this.model)};

  //FORM EVENT SECTION STARTS
  savePower(){
    if(this.model.Name && this.model.Power){
      this.model.Id = this.helperService.getNewGuid();
      this.Heroes.push(this.model);
      localStorage.setItem("Heroes",JSON.stringify(this.Heroes));
      this.resetForm();
      this.close();
    }
    // this.modalRef.dismiss('Saved');
    // this.helperService.setHeroPower(this.model,result => {
    //   console.log(result);
    // },error => {
    //   console.log(error);
    // })
  }
  updatePower(){
    console.log("this.model",this.model)
    if(this.model.Name && this.model.Power && this.model.Id){
      for(let hero of this.Heroes){
        if(hero.Id == this.model.Id){
          //this.Heroes = localStorage.getItem("Heroes") ? JSON.parse(localStorage.getItem("Heroes")) : [];
          var index = this.Heroes.indexOf(hero);
          this.Heroes[index].Name = this.model.Name;
          this.Heroes[index].Power = this.model.Power;
          this.Heroes[index].AlterEgo = this.model.AlterEgo;
          localStorage.setItem("Heroes",JSON.stringify(this.Heroes));
          this.close();
          return false;
        }
      }

    }
    // this.activeModal.dismiss('Saved');
    // this.helperService.setHeroPower(this.model,result => {
    //   console.log(result);
    // },error => {
    //   console.log(error);
    // })
  }
  open(content){
    this.resetForm();
    this.modalRef =this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.ngOnInit();
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      this.closeResult = `Dismissied ${this.getDismissReason(reason)}`
    })
  }

  private getDismissReason(reason: any): string {
    this.ngOnInit();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  removeHero(hero,e){
    e.stopPropagation();
    if(confirm("Are you sure you want to delete?")){
      var index = this.Heroes.indexOf(hero);
      if(index > -1){
        this.Heroes.splice(index,1);
        localStorage.setItem("Heroes",JSON.stringify(this.Heroes));
      }
      this.ngOnInit();
    }
  }


  editHero(content,hero){
    // alert(JSON.stringify(hero));
    hero.selected = false;
    this.modalRef =this.modalService.open(content);
    this.model = hero;
    console.log("hero",hero);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      this.closeResult = `Dismissied ${this.getDismissReason(reason)}`
    })
  }

  resetForm(){
    this.model = new Hero("","","");
  }
  close(){
    console.log("this.modalRef",this.modalRef);
    this.modalRef.dismiss();
  }

  cardSelected(hero){
    hero.selected = !hero.selected;
    var index = this.selectedHeroes.indexOf(hero);
    if(index > -1){
      this.selectedHeroes.splice(index,1);
    }
    else{
      this.selectedHeroes.push(hero);
    }
    console.log(" this.selectedHeroes", this.selectedHeroes);
  }

  deleteSelected(){
    // selecting indexes
    for(let hero of this.selectedHeroes){
      var index = this.Heroes.indexOf(hero);
      if(index > -1){
        this.Heroes.splice(index,1);
      }
    }
    this.selectedHeroes = [];
    //Update local storage
    localStorage.setItem("Heroes",JSON.stringify(this.Heroes));
  }
//FORM EVENT SECTION ENDS


}
