import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {

  message: string = "Hola Mundo!"
  @Output() messageEvent = new EventEmitter<string>();
  constructor() { }
  sendMessage() {
    this.messageEvent.emit(this.message)
  }

  ngOnInit() {
    this.messageEvent.emit(this.message)
  }

}
