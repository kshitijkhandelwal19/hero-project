import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html',
})

export class BarChartComponent implements OnInit {
    private sub:any;
    chartId:number;
    constructor(private route:ActivatedRoute) { 
        this.sub = this.route.parent.params.subscribe(params => {
            this.chartId = params["id"];
        })
    }

    ngOnInit(): void {
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    //Chart 2 [ColumnChart]
  public columnChartData:any =  {
    chartType: 'ColumnChart',
    dataTable: [
      ['Country', 'Performance', 'Profits'],
      ['Germany', 700, 1200],
      ['USA', 300, 600],
      ['Brazil', 400, 500],
      ['Canada', 500, 1000],
      ['France', 600, 1100],
      ['RU', 800, 1000]
    ],
    options: {title: 'Countries'}
  };
}

