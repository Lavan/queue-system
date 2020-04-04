import { Component, OnInit } from '@angular/core';
import { SiteService } from '../services/site.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { QueueInfo, SiteInfo } from '@queue-system/api-interfaces';

@Component({
  selector: 'queue-system-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css']
})
export class SiteDetailComponent implements OnInit {
  queues: Observable<QueueInfo[]>;
  siteInfo: Observable<SiteInfo>;

  constructor(private route: ActivatedRoute, private readonly siteService: SiteService) {
    route.paramMap.subscribe(params => {
      const siteId = params.get('siteId');
      this.siteInfo = this.siteService.getSite(siteId);
      this.queues = this.siteService.getQueues(siteId);
    });
  }

  ngOnInit(): void {
  }
}
