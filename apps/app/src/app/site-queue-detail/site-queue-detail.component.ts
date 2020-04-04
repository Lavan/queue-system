import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../services/site.service';
import { Observable } from 'rxjs';
import { QueueInfo, SiteInfo } from '@queue-system/api-interfaces';

@Component({
  selector: 'queue-system-site-queue-detail',
  templateUrl: './site-queue-detail.component.html',
  styleUrls: ['./site-queue-detail.component.css']
})
export class SiteQueueDetailComponent implements OnInit {
  private siteInfo$: Observable<SiteInfo>;
  private queue$: Observable<QueueInfo>;

  constructor(private readonly route: ActivatedRoute,
              private readonly siteService: SiteService) {
    route.paramMap.subscribe(params => {
      const siteId = params.get('siteId');
      const queueId = params.get('queueId');
      this.siteInfo$ = this.siteService.getSite(siteId);
      this.queue$ = this.siteService.getQueue(siteId, queueId);
    });
  }

  ngOnInit(): void {
  }

}
