import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../services/site.service';
import { QueueInfo, SiteInfo } from '@queue-system/api-interfaces';
import { toHHMMSS } from '../utilities';

@Component({
  selector: 'queue-system-site-queue-detail',
  templateUrl: './site-queue-detail.component.html',
  styleUrls: ['./site-queue-detail.component.scss']
})
export class SiteQueueDetailComponent implements OnInit, OnDestroy {
  siteInfo: SiteInfo;

  queueId: string;
  queueDescription: string;
  currentTicket: number;
  estimatedTime: string;
  queueLength: number;
  private updateIntervalHandle: number;
  queueUrl: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly siteService: SiteService) {

    route.paramMap.subscribe(params => {
      const siteId = params.get('siteId');
      const queueId = params.get('queueId');
      this.clearQueue();
      this.siteService.getSite(siteId).subscribe(siteInfo => this.siteInfo = siteInfo);
      this.siteService.getQueue(siteId, queueId).subscribe(queue => this.setQueue(queue));
    });
  }

  ngOnInit(): void {
    this.updateIntervalHandle = setInterval(() => this.updateQueue(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.updateIntervalHandle);
  }

  updateQueue() {
    this.siteService.getQueue(this.siteInfo.id, this.queueId).subscribe(queue => this.setQueue(queue));
  }

  advanceQueue() {
    this.siteService.advanceQueue(this.siteInfo.id, this.queueId).subscribe(queue => this.setQueue(queue));
  }

  private clearQueue() {
    this.queueId = undefined;
    this.queueDescription = undefined;
    this.currentTicket = undefined;
    this.estimatedTime = undefined;
    this.queueLength = undefined;
  }

  private setQueue(queue: QueueInfo) {
    if (!queue) {
      this.clearQueue();
      return;
    }
    this.queueId = queue.id;
    this.queueUrl = `${location.origin}/queue/${this.queueId}`;
    this.queueDescription = queue.description;
    this.currentTicket = queue.currentTicket;
    this.estimatedTime = toHHMMSS(queue.estimatedTime);
    this.queueLength = queue.queueLength;
  }
}
