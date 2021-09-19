import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService, EventData } from 'src/app/model/data.service';
import { Day } from 'src/app/model/day.model';
import { MonthService } from '../month.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  yearAndMonth:string[];
  day:Day;
  constructor(private monthService:MonthService,
    private dataService:DataService) { }

  ngOnInit(): void {
    this.monthService.dayEvent.subscribe((res:Day)=> {
      this.day=res;
      this.yearAndMonth = this.monthService.yearAndMonth.split("-");
      this.yearAndMonth[1]=this.monthService.getYears()[(+this.yearAndMonth[1])-1];
    });
  }

  onSubmit(form:NgForm) {
    let eventObject = this.dataService.getEventData().filter((data)=> data.date==this.day.date&& data.month==this.yearAndMonth[1]&& data.year==this.yearAndMonth[0]);
    if(eventObject.length > 0) {
      if(form.value.exit !="") {
      let prevEntry=this.dataService.removeEntry(this.day.date,this.yearAndMonth[0],this.yearAndMonth[1]);
      prevEntry.exitTime = form.value.exit;
      this.dataService.addEntry(prevEntry);
      this.monthService.setExitTime(this.day.date,prevEntry.exitTime);
      }
    }
    else {
      if(form.value.entry!="") {
      let date: string = this.day.date;
      let year: string = this.yearAndMonth[0];
      let month:string = this.yearAndMonth[1];
      let entryTime:string = form.value.entry;
      let newEntry:EventData = new EventData();
      newEntry.date=date;
      newEntry.year=year;
      newEntry.month=month;
      newEntry.entryTime=entryTime;

      this.dataService.addEntry(newEntry);
      this.monthService.setEnrtyTime(date,entryTime);
    }
  }


    this.day=null;
    console.log(this.dataService.arr);
  }
  onCancel() {
    this.day=null;
  }
}
