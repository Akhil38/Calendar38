import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('date', { static: true, read: ElementRef }) monthInput:ElementRef;
  constructor(private headerService:HeaderService) { }

  ngOnInit(): void {
    this.initializeMonthValue();
  }
  
  initializeMonthValue() {
    let year = new Date().getFullYear().toString();
    let month = (new Date().getMonth()+1).toString();
    month= this.correctMonth(month);
    this.monthInput.nativeElement.value=year+"-"+month;
  }

  correctMonth(m:string) {
    if(m.length < 2) {
      return "0"+m;
    }
    return m;
  }

  onMonthChange() {
    this.headerService.monthChanged.next(this.monthInput.nativeElement.value);
  }
}
