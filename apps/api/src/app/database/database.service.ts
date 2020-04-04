import { Injectable } from '@nestjs/common';
import { QueueInfo, SiteInfo, TicketInfo } from '@queue-system/api-interfaces';
import { generateRandomString } from '../utilities';

@Injectable()
export class DatabaseService {
  async getSite(siteId: string): Promise<SiteInfo> {
    return { description: '', position: undefined, queues: [], id: siteId };
  }

  async getQueue(queueId: string): Promise<QueueInfo> {
    return { description: '', estimatedTime: 0, id: queueId, queueLength: 0 };
  }

  async getTicket(queueId: string): Promise<TicketInfo> {
    return { description: '', estimatedTime: 0, id: generateRandomString(), ticketNumber: 0 };
  }

  async getTicketStatus(queueId: string, ticketId: string): Promise<TicketInfo> {
    return { description: '', estimatedTime: 0, id: ticketId, ticketNumber: 0 };
  }

  async addSite(site: SiteInfo): Promise<SiteInfo> {
    return { description: site.description, position: site.position, queues: site.queues, id: generateRandomString() };
  }

  async updateSite(site: SiteInfo): Promise<SiteInfo> {
    return { description: site.description, position: site.position, queues: site.queues, id: site.id };
  }
}
