import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';
import { DataService } from '../model/data.service';
import { Day } from '../model/day.model';

@Injectable({
    providedIn: 'root'
})
export class MonthService {

    constructor(private dataService: DataService) { }

    private weekDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'];

    private arrayOfDays: Day[];

    private years: string[] = ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"];
    yearAndMonth: string;
    dayEvent: Subject<Day> = new Subject<Day>();
    getWeekDays() {
        return this.weekDays.slice();
    }

    getChangedDaysArray(yearAndMonth: string, arrayOfDays: Day[]) {
        this.resetDaysArray(arrayOfDays);
        this.yearAndMonth = yearAndMonth;
        let date: Date = new Date(yearAndMonth);
        let date2: Date = new Date(yearAndMonth);
        let monthValue = date.getMonth();
        let dayValue = date.getDay();
        let counter = 1;
        let dateMap: Map<string, Day> = this.buildDateMap(date.getFullYear() + "", this.years[monthValue], this.dataService.getEventData());

        date2.setDate(date.getDate() - 1);
        let counter2 = date2.getDate();
        for (let i = dayValue - 1; i >= 0; i--) {
            arrayOfDays[i] = new Day("");
            arrayOfDays[i].date = counter2 + "";
            counter2--;
        }
        for (let i = 0; i < 35; i++) {
            if (i >= dayValue) {
                arrayOfDays[i] = new Day("");
                arrayOfDays[i].entryTime = null;
                arrayOfDays[i].exitTime = null;
                arrayOfDays[i].date = counter + "";
                arrayOfDays[i].month = this.years[monthValue];
                arrayOfDays[i].year = date.getFullYear() + "";

                let event = dateMap.get(counter + "");
                if (event) {
                    arrayOfDays[i].entryTime = event.entryTime;
                    arrayOfDays[i].exitTime = event.exitTime;
                    arrayOfDays[i].markRed = null;
                }
                this.markDayRed(arrayOfDays[i]);
                counter++;
                date.setDate(date.getDate() + 1);
            }
            if (date.getMonth() != monthValue) {
                let interator = 1;
                for (let j = i + 1; j < 35; j++) {
                    arrayOfDays[j].date = interator + "";
                    interator++;
                }
                break;
            }
        }
        this.arrayOfDays = arrayOfDays;
    }

    resetDaysArray(arr: Day[]) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Day("");
        }
    }

    correctMonth(m: string) {
        if (m.length < 2) {
            return "0" + m;
        }
        return m;
    }

    getYears() {
        return this.years.slice();
    }

    setEnrtyTime(day: string, entryTime: string) {
        for (let i = 0; i < this.arrayOfDays.length; i++) {
            if (this.arrayOfDays[i].date && this.arrayOfDays[i].date == day) {
                this.arrayOfDays[i].entryTime = entryTime;
                this.arrayOfDays[i].markRed = null;
                break;
            }
        }
    }
    setExitTime(day: string, exitTime: string) {
        for (let i = 0; i < this.arrayOfDays.length; i++) {
            if (this.arrayOfDays[i].date && this.arrayOfDays[i].date == day) {
                this.arrayOfDays[i].exitTime = exitTime;
            }
        }
    }

    buildDateMap(year: string, month: string, arr: Day[]) {

        let map: Map<string, Day> = new Map();
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].year == year && arr[i].month == month) {
                map.set(arr[i].date, arr[i]);
            }
        }
        return map;
    }

    getMonthIndex(month: string) {
        for (let i = 0; i < this.years.length; i++) {
            if (this.years[i] == month) {
                return i;
            }
        }
        return -1;
    }

    markDayRed(day: Day) {
        let todayDate: Date = new Date()
        if (day.month == this.years[todayDate.getMonth()] && day.year == todayDate.getFullYear() + "") {
            if (+day.date <= todayDate.getDate() && !day.entryTime) {
                day.markRed = "red";
            }
        }
        else if ((day.year == todayDate.getFullYear() + "" && this.getMonthIndex(day.month) > this.getMonthIndex(this.years[todayDate.getMonth()]))) {
            day.markRed = null;
        }
        else if ((day.year == todayDate.getFullYear() + "" && this.getMonthIndex(day.month) < this.getMonthIndex(this.years[todayDate.getMonth()]))) {
            if (!day.entryTime) {
                day.markRed = "red";
            }
        }
        else if ((day.year < todayDate.getFullYear() + "")) {
            if (!day.entryTime) {
                day.markRed = "red";
            }
        }
    }
}