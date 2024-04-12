import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class SearchSerive {
  private inputvalue$ = new BehaviorSubject('')
    data$ = this.inputvalue$.asObservable()
    constructor(){}

    setinputvalue(input: string) {
        this.inputvalue$.next(input);
        
    }

    getinput() {
        return this.data$
    }

    
}