import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroComponentComponent } from './hero-component/hero-component.component';
import {HelperService} from './helper.service';
import { BarChartComponent } from './google-charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './google-charts/pie-chart/pie-chart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

//Shared module
import { SharedModule } from './shared/shared.module';
import { VillainComponent } from './villain/villain.component';
import { GoogleChartsComponent } from './google-charts/google-charts.component';
import {IdentifyTypePipe} from './shared/identifyType.pipe';
import {SearchPipe} from './shared/search.pipe';
import {SortPipe} from './shared/sort.pipe';
import {NoopInterceptor} from './shared/interceptor.service';
import {ChildComponentComponent} from './child-component/child-component.component';

//Logs
import {LoggerService} from './logs/logger.service';
import {ConsoleLoggerService} from './logs/console-logger.service';

//Loader
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

//Animations
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//ROUTING CONFIGURATION STARTS
const appRoutes: Routes = [
  { path: 'hero', component: HeroComponentComponent },
  { path: 'villain', component: VillainComponent},
  { 
    path: 'charts/:id', component: GoogleChartsComponent,
    children:[
      {path:'', redirectTo:'pie',pathMatch: 'full'}, 
      {path:'pie', component:PieChartComponent},
      {path:'bar', component:BarChartComponent}   
    ]
  },
  {path:'pageNotFound', component:PageNotFoundComponent},
  { path: '',
    redirectTo: '/hero',
    pathMatch: 'full'
  },
]
//ROUTING CONFIGURATION ENDS

@NgModule({
  declarations: [
    AppComponent,
    HeroComponentComponent,
    VillainComponent,
    GoogleChartsComponent,
    IdentifyTypePipe,
    BarChartComponent,
    PieChartComponent,
    SearchPipe,
    SortPipe,
    PageNotFoundComponent,
    ChildComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(appRoutes,{enableTracing:true}),
    NgbModule.forRoot(),
    Ng2GoogleChartsModule,
    NgHttpLoaderModule
  ],
  providers: 
  [
    HelperService,
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
    { provide: LoggerService, useClass : ConsoleLoggerService  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
