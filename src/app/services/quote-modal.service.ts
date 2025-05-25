import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteModalService {
  private openSubject = new Subject<void>();
  open$ = this.openSubject.asObservable();

  open() {
    this.openSubject.next();
  }
}
