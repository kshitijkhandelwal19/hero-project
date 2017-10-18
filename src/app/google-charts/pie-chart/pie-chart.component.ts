import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'pie-chart',
    templateUrl: './pie-chart.component.html',
})

export class PieChartComponent implements OnInit {
    constructor(){
    }
    ngOnInit(): void {
    }

    //Chart 1 [PieChart]
    public pieChartData =  {
      chartType: 'PieChart',
      dataTable: [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7]
      ],
      options: {'title': 'Tasks'},
    };
}

