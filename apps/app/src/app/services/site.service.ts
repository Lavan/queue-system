import { Injectable } from '@angular/core';
import { CreateSiteDto, QueueInfo, SiteInfo } from '@queue-system/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  currentSite: string;
  private currentSiteSubject = new Subject<string>();
  currentSite$ = this.currentSiteSubject.asObservable();

  constructor(private readonly http: HttpClient) {
    this.currentSite$.subscribe(current => {
      this.currentSite = current;
      if(current) {
        localStorage.setItem('siteId', current);
      }else {
        localStorage.removeItem('siteId');
      }
    });
    this.currentSite = localStorage.getItem('siteId');
    if (this.currentSite) {
      this.currentSiteSubject.next(this.currentSite);
    }
  }

  createSite(param: CreateSiteDto): Observable<SiteInfo> {
    return this.http.post<SiteInfo>('/api/site/register', param)
      .pipe(
        tap(current => console.log(current)),
        tap(current => this.currentSiteSubject.next(current.id)),
        take(1)
      );
  }

  updateSite(param: CreateSiteDto): Observable<SiteInfo> {
    return this.http.post<SiteInfo>('/api/site/register', param);
  }

  getSite(siteId: string): Observable<SiteInfo> {
    return this.http.get<SiteInfo>('/api/site/' + siteId)
      .pipe(
        tap(current => this.currentSiteSubject.next(current.id)),
        take(1),
        catchError(err => {
          return of(<SiteInfo>{});
        })
      );
  }

  getQueue(siteId: string, queueId: string): Observable<QueueInfo> {
    return this.http.get<QueueInfo>(`/api/site/${siteId}/${queueId}`)
      .pipe(
        take(1),
        catchError(err => {
          return of(<QueueInfo>{});
        })
      );
  }

  getQueues(siteId: string): Observable<QueueInfo[]> {
    return this.http.get<QueueInfo[]>('/api/site/' + siteId + '/queues')
      .pipe(
        take(1),
        catchError(err => {
          return of([]);
        })
      );

  }

  createQueue(siteId: string, queueDescription: string): Observable<QueueInfo> {
    return this.http.post<QueueInfo>(`/api/site/${siteId}/new`, { description: queueDescription })
      .pipe(
        tap(current => console.log('createQueue', current)),
        take(1)
      );

  }

  logout() {
    this.currentSiteSubject.next();
    localStorage.removeItem('siteId');
  }
}
