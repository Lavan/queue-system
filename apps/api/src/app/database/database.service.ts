import { Injectable } from '@nestjs/common';
import { QueueInfo, SiteInfo, TicketInfo } from '@queue-system/api-interfaces';
import { generateRandomString } from '../utilities';

@Injectable()
export class DatabaseService {
  getSite(id: string): SiteInfo {
    return { description: '', position: undefined, queues: [], id };
  }

  getQueue(id: string): QueueInfo {
    return { description: '', estimatedTime: 0, id, queueLength: 0 };
  }

  getTicket(id: string): TicketInfo {
    return { description: '', estimatedTime: 0, id, ticketNumber: 0 };
  }

  async addSite(site: SiteInfo): Promise<SiteInfo> {
    return { description: site.description, position: site.position, queues: site.queues, id: generateRandomString() };
  }

  async updateSite(site: SiteInfo): Promise<SiteInfo> {
    return { description: site.description, position: site.position, queues: site.queues, id: site.id };
  }

}
