import { Injectable } from "@angular/core";

export class EventData {
    public date: string;
    public year: string;
    public month: string;
    public entryTime: string;
    public exitTime: string
}
@Injectable({
    providedIn:'root'
})
export class DataService {
    public arr:any[]=[];

    removeEntry(date:string,year:string,month:string) {
        let object:EventData
        for(let i=0; i<this.arr.length;i++) {
            if (this.arr[i].date == date && this.arr[i].month == month && this.arr[i].year == year) {
                object = this.arr[i];
                this.arr.splice(i,1);
                break;
            }
        }
        return object;
    }

    addEntry(data:EventData) {
        this.arr.push(data);
        localStorage.removeItem('eventData');
        localStorage.setItem('eventData',JSON.stringify(this.arr));
    }

    getEventData() {
        let data = localStorage.getItem('eventData');
        if(!data) {
            return []
        }
        this.arr = JSON.parse(data);
        return this.arr;
    }
}