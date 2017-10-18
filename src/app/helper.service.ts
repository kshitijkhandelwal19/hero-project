import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders  } from '@angular/common/http';

@Injectable()
export class HelperService {
  constructor(private http:HttpClient) { }

  getRandomNumber(){
    return Math.floor(1000 + Math.random() * 9000);
  }

  setHeroPower(data,success,error){
    console.log("data to be sent",data);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post("http://localhost:52919/api/Hero",data,{headers:headers}).subscribe(success,error);
  }

  getHeroes(success,error){
    this.http.get("http://localhost:52919/api/Hero").subscribe(success,error);
  }

  getNewGuid(){
    return this.randomNumber() + this.randomNumber() + '-' + this.randomNumber() + '-' + this.randomNumber() + '-' +
    this.randomNumber() + '-' + this.randomNumber() + this.randomNumber() + this.randomNumber();
  }
  
  private randomNumber(){
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
}
