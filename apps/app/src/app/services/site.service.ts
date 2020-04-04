import { Injectable } from '@angular/core';
import { CreateSiteDto, QueueInfo, SiteInfo } from '@queue-system/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  currentSite: string;
  private currentSiteSubject: Subject<string>;
  currentSite$: Observable<string>;

  constructor(private readonly http: HttpClient) {
    this.currentSite = localStorage.getItem('siteId');
    if (this.currentSite) {
      this.currentSiteSubject = new BehaviorSubject(this.currentSite);
    } else {
      this.currentSiteSubject = new Subject<string>();
    }
    this.currentSite$ = this.currentSiteSubject.asObservable();

    this.currentSite$.subscribe(current => {
      this.currentSite = current;
      if (current) {
        localStorage.setItem('siteId', current);
      } else {
        localStorage.removeItem('siteId');
      }
    });
  }

  createSite(param: CreateSiteDto): Observable<SiteInfo> {
    return this.http.post<SiteInfo>('/api/site/register', param)
      .pipe(
        tap(current => this.currentSiteSubject.next(current.id)),
        take(1),
        catchError(err => of(undefined))
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
        catchError(err => of(undefined))
      );
  }

  getQueue(siteId: string, queueId: string): Observable<QueueInfo> {
    return this.http.get<QueueInfo>(`/api/site/${siteId}/${queueId}`)
      .pipe(
        take(1),
        catchError(err => of(undefined))
      );
  }

  getQueues(siteId: string): Observable<QueueInfo[]> {
    return this.http.get<QueueInfo[]>('/api/site/' + siteId + '/queues')
      .pipe(
        take(1),
        catchError(err => of([]))
      );

  }

  createQueue(siteId: string, queueDescription: string): Observable<QueueInfo> {
    return this.http.post<QueueInfo>(`/api/site/${siteId}/new`, { description: queueDescription })
      .pipe(
        take(1)
      );

  }

  logout() {
    this.currentSiteSubject.next();
    localStorage.removeItem('siteId');
  }

  advanceQueue(siteId: string, queueId: string) {
    return this.http.post<QueueInfo>(`/api/site/${siteId}/${queueId}/advance`, {})
      .pipe(
        take(1)
      );
  }
}
