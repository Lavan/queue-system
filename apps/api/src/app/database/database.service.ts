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

const sites = new Map();
const queues = new Map();
const tickets = new Map();

export const createSite = (descr: string) => {

  const site = {} as Site;

  site.id = generateRandomString();
  site.descr = descr;
  site.queues = new Array();

  sites.set(site.id, site);
  return site;
};

export const createQueue = (site: Site, descr: string) => {

  const queue = {} as Queue;

  queue.id = generateRandomString();
  queue.site_id = site.id;
  queue.descr = descr;
  queue.current_nr = 0;
  queue.next_nr = 0;
  queue.tickets = new Array();

  site.queues.push(queue);

  queues.set(queue.id, queue);
  return queue;
};

export const createTicket = (queue: Queue) => {

  const ticket = {} as Ticket;

  ticket.id = generateRandomString();
  ticket.queue_id = queue.id;
  ticket.nr = queue.next_nr++;

  queue.tickets.push(ticket);

  tickets.set(ticket.id, ticket);
  return ticket;
};

export const advanceQueue = (queue: Queue) => {
  // remove from queue
  const removed_ticket = queue.tickets.shift();
  console.log("removed : " + removed_ticket.id);

  // remove from ticket list
  tickets.delete(removed_ticket.id);

  queue.current_nr++;

  return queue.tickets.length;
};

const stubData = () => {
  console.log("Stubbing data!")
  const s = createSite("Systembolaget");
  const q = createQueue(s, "Insläpp");

  for (let i = 0; i < 30; i++) {
    createTicket(q);
  }
  printData()
};

const printData = () => {
  for (let value of sites.values()) {
    console.log(value);
  }

  for (let value of queues.values()) {
    console.log(value);
  }

  for (let value of tickets.values()) {
    console.log(value);
  }
};

stubData();

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

  async addSite(site: CreateSiteDto): Promise<SiteInfo> {
    return { description: site.description, position: site.position, queues: [], id: generateRandomString() };
  }

  async updateSite(site: SiteInfo): Promise<SiteInfo> {
    return { description: site.description, position: site.position, queues: site.queues, id: site.id };
  }
}
