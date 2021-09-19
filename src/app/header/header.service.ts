import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class HeaderService {
    monthChanged:Subject<string>=new Subject<null>();
}