import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from '../services/site.service';
import { QueueInfo } from '@queue-system/api-interfaces';
import { toHHMMSS } from '../utilities';

@Component({
  selector: 'queue-system-queue-detail',
  templateUrl: './queue-detail.component.html',
  styleUrls: ['./queue-detail.component.scss']
})
export class QueueDetailComponent implements OnInit, OnDestroy {
  estimatedTime: string;
  description: string;
  private queueId: string;
  private updateIntervalHandle: number;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly siteService: SiteService) {
    route.paramMap.subscribe(params => {
      const queueId = params.get('queueId');
      this.siteService.getUserQueue(queueId).subscribe(queue => this.setQueue(queue));
    });
  }

  ngOnInit(): void {
    this.updateIntervalHandle = setInterval(() => this.updateQueue(), 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.updateIntervalHandle);
  }

  updateQueue() {
    this.siteService.getUserQueue(this.queueId).subscribe(queue => this.setQueue(queue));
  }

  private setQueue(queue: QueueInfo) {
    if (!queue) {
      this.clearQueue();
      return;
    }
    this.queueId = queue.id;
    this.estimatedTime = toHHMMSS(queue.estimatedTime);
    this.description = queue.description;
  }

  clearQueue() {
    this.queueId = undefined;
    this.estimatedTime = undefined;
    this.description = undefined;
  }

  enter() {
    this.siteService.enterQueue(this.queueId)
      .subscribe(ticket => this.router.navigate(['/queue', this.queueId, ticket.id]));
  }
}

