import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { Day } from '../model/day.model';
import { MonthService } from './month.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  weekDays:string[];
  arrayOfDays: Day[];
  constructor(private headerService:HeaderService,
    private monthService:MonthService) { }

  ngOnInit(): void {
    this.weekDays=this.monthService.getWeekDays();
    let date = new Date();
    let res = date.getFullYear()+"-"+this.monthService.correctMonth((date.getMonth()+1)+"");
    this.arrayOfDays = new Array<Day>(35);
    this.monthService.getChangedDaysArray(res, this.arrayOfDays);

    this.headerService.monthChanged.subscribe((res:string) => {
      this.monthService.getChangedDaysArray(res,this.arrayOfDays);
    });
  }

  onClickDay(day:Day) {
    this.monthService.dayEvent.next(day);
  }

}
