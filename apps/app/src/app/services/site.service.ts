import { Injectable } from '@angular/core';
import { CreateSiteDto, SiteInfo } from '@queue-system/api-interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  currentSite: string;

  constructor(private readonly http: HttpClient) {
    this.currentSite = localStorage.getItem('siteId');
  }

  async createSite(param: CreateSiteDto): Promise<SiteInfo> {
    return this.http.post<SiteInfo>('/api/site/register', param).toPromise();
  }
}
