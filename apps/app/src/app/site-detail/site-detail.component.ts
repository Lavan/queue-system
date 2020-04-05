import { Component, OnDestroy, OnInit } from '@angular/core';
import { SiteService } from '../services/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QueueInfo, SiteInfo } from '@queue-system/api-interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'queue-system-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css']
})
export class SiteDetailComponent implements OnInit, OnDestroy {
  queues: QueueInfo[] = [];
  siteInfo: SiteInfo;
  queueDescription: string;
  private paramSubscription: Subscription;
  siteUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private readonly siteService: SiteService) {
    this.siteUrl = location.href;
    this.paramSubscription = route.paramMap.subscribe(params => {
      const siteId = params.get('siteId');
      this.updateSite(siteId);
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  private updateSite(siteId: string) {
    this.siteService.getSite(siteId).subscribe(siteInfo => this.siteInfo = siteInfo);
    this.siteService.getQueues(siteId).subscribe(queues => this.queues = queues);
  }

  ngOnInit(): void {
  }

  createQueue() {
    this.siteService.createQueue(this.siteInfo.id, this.queueDescription)
      .subscribe(queueInfo => {
        this.queueDescription = '';
        this.updateSite(this.siteInfo.id);
      });
  }

  exitSite() {
    this.siteService.logout();
    this.router.navigate(['/site']);
  }
}
