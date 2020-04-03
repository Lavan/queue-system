import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Id } from '@queue-system/api-interfaces';

@Component({
  selector: 'queue-system-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = this.http.get<Id>('/api/hello');
  constructor(private http: HttpClient) {}
}
