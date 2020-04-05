import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../services/site.service';
import { TicketInfo } from '@queue-system/api-interfaces';
import { toHHMMSS } from '../utilities';

@Component({
  selector: 'queue-system-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnDestroy {
  private queueId: string;
  private ticketId: string;
  private updateIntervalHandle: number;

  description: string;
  ticketNumber: number;
  estimatedTime: string;

  constructor(private route: ActivatedRoute, private siteService: SiteService) {
    route.paramMap.subscribe(params => {
      this.queueId = params.get('queueId');
      this.ticketId = params.get('ticketId');
      this.updateTicketStatus();
    });

  }

  ngOnInit(): void {
    this.updateIntervalHandle = setInterval(() => this.updateTicketStatus(), 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.updateIntervalHandle);
  }

  updateTicketStatus() {
    this.siteService.getTicketStatus(this.queueId, this.ticketId).subscribe(ticket => this.setTicketStatus(ticket));
  }

  private setTicketStatus(ticket: TicketInfo) {
    if (!ticket) {
      return;
    }
    this.description = ticket.description;
    this.ticketNumber = ticket.ticketNumber;
    this.estimatedTime = toHHMMSS(ticket.estimatedTime);
  }
}
