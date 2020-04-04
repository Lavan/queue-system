import { Component, OnInit } from '@angular/core';
import { SiteService } from '../services/site.service';
import { ActivatedRoute } from '@angular/router';
import { QueueInfo, SiteInfo } from '@queue-system/api-interfaces';

@Component({
  selector: 'queue-system-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css']
})
export class SiteDetailComponent implements OnInit {
  queues: QueueInfo[] = [];
  siteInfo: SiteInfo;

  constructor(private route: ActivatedRoute, private readonly siteService: SiteService) {
    route.paramMap.subscribe(params => {
      const siteId = params.get('siteId');
      this.updateSite(siteId);
    });
  }

  private updateSite(siteId: string) {
    this.siteService.getSite(siteId).subscribe(siteInfo => this.siteInfo = siteInfo);
    this.siteService.getQueues(siteId).subscribe(queues => this.queues = queues);
  }

  ngOnInit(): void {
  }

  createQueue() {
    this.siteService.createQueue(this.siteInfo.id);
    this.updateSite(this.siteInfo.id);
  }
}
