import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader/spinkits';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public spinkit = Spinkit;

  message:string;
  receiveMessage($event) {
    this.message = $event
  }

  htmlContent:string = 'Template <script>alert("0wned")</script> <b>Syntax</b>';
}
