import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    constructor(private route:Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const changedReq = req.clone({headers: req.headers.set('Authorization', 'Bearer BJ3LK645L6BN45L6N546L54N6')});
      console.log("changedReq",changedReq);
      const started = Date.now();
      return next.handle(changedReq).do(event => {
        // console.log("event",event);
        if (event instanceof HttpResponse) { //<-- HERE
        //   console.log("event",event);
        }
      })
      .catch(event => {
        console.log('Caught error', event);
        if(event && event.status == 404){
            this.route.navigate(["/pageNotFound"]);
        }
        return Observable.throw(event);
      })
    }
  }
