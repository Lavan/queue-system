import { Injectable } from '@nestjs/common';
import { CreateSiteDto, QueueInfo, SiteInfo, TicketInfo } from '@queue-system/api-interfaces';
import { generateRandomString } from '../utilities';

interface Site {
  id: string;
  descr: string;
  queues: Queue[];
}

interface Queue {
  id: string;
  site_id: string;
  descr: string;
  current_nr: number;
  next_nr: number;
  tickets: Ticket[]
}

interface Ticket {
  id: string;
  queue_id: string;
  nr: number;
}

const sites = {};
const queues = {};
const tickets = {};

const createSite = (descr: string, force_id?: string) => {

  const site: Site = {
    id: force_id ?? generateRandomString(),
    descr: descr,
    queues: []
  };

  sites[site.id] = site;
  return site;
};

const createQueue = (site: Site, descr: string, force_id?: string) => {

  const queue: Queue = {
    id: force_id ?? generateRandomString(),
    site_id: site.id,
    descr: descr,
    current_nr: 0,
    next_nr: 0,
    tickets: []
  };
  site.queues.push(queue);

  queues[queue.id] = queue;
  return queue;
};

const createTicket = (queue: Queue) => {

  const ticket = {} as Ticket;

  ticket.id = generateRandomString();
  ticket.queue_id = queue.id;
  ticket.nr = queue.next_nr++;

  queue.tickets.push(ticket);

  tickets[ticket.id] = ticket;
  return ticket;
};

const advanceQueue = (queue: Queue) => {
  // remove from queue
  const removed_ticket = queue.tickets.shift();
  console.log('removed : ' + removed_ticket.id);

  // remove from ticket list
  delete tickets[removed_ticket.id];

  queue.current_nr++;

  return queue.tickets.length;
};

const stubData = () => {
  console.log('Stubbing data!');
  const s = createSite('Systembolaget', 'site_1');
  const q = createQueue(s, 'Insläpp', 'queue_1');

  for (let i = 0; i < 30; i++) {
    createTicket(q);
  }
  printData();
};

const printData = () => {
  console.log(JSON.stringify(sites));
};

stubData();

@Injectable()
export class DatabaseService {
  async getSite(siteId: string): Promise<SiteInfo> {
    const s = sites[siteId];
    const queue_ids = s.queues.map(queue => queue.id);
    return { description: s.descr, position: undefined, queues: queue_ids, id: siteId };
  }

  async getQueues(siteId: string): Promise<QueueInfo[]> {
    const site = sites[siteId];
    return site.queues.map<QueueInfo>((queue: Queue) => ({
      id: queue.id,
      description: queue.descr,
      estimatedTime: 0,
      queueLength: queue.tickets.length
    }));
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

  async addSite(site: CreateSiteDto): Promise<SiteInfo> {
    const s = createSite(site.description);
    return { description: s.descr, position: site.position, queues: [], id: s.id };
  }

  async addQueue(siteId: string, queueDescription: string): Promise<QueueInfo> {
    const site = sites[siteId];
    const q = createQueue(site, queueDescription);

    return { id: q.id, description: q.descr, estimatedTime: 0, queueLength: q.tickets.length };
  }

  async updateSite(site: SiteInfo): Promise<SiteInfo> {
    return { description: site.description, position: site.position, queues: site.queues, id: site.id };
  }
}
