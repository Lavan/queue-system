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

const createSite = (descr: string, force_id: string="") => {

  const site = {} as Site;

  if (force_id === "") {
    site.id = generateRandomString();
  }
  else {
    site.id = force_id;
  }
  site.descr = descr;
  site.queues = new Array();

  sites.set(site.id, site);
  return site;
};

const createQueue = (site: Site, descr: string, force_id: string="") => {

  const queue = {} as Queue;

  if (force_id === "") {
    queue.id = generateRandomString();
  }
  else {
    queue.id = force_id;
  }
  queue.site_id = site.id;
  queue.descr = descr;
  queue.current_nr = 0;
  queue.next_nr = 0;
  queue.tickets = new Array();

  site.queues.push(queue);

  queues.set(queue.id, queue);
  return queue;
};

const createTicket = (queue: Queue) => {

  const ticket = {} as Ticket;

  ticket.id = generateRandomString();
  ticket.queue_id = queue.id;
  ticket.nr = queue.next_nr++;

  queue.tickets.push(ticket);

  tickets.set(ticket.id, ticket);
  return ticket;
};

const advanceQueue = (queue: Queue) => {
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
  const s = createSite("Systembolaget", "site_1");
  const q = createQueue(s, "Insläpp", "queue_1");

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
    const s = sites.get(siteId);

    const queue_ids = [];
    for (let q of s.queues) {
      queue_ids.push(q.id);
    }
    return { description: s.descr, position: undefined, queues: queue_ids, id: siteId };
    // return { description: '', position: undefined, queues: [], id: siteId };
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

  async addQueue(site_id: string, queue_descr: string): Promise<QueueInfo> {
    const site = sites.get(site_id);
    const q = createQueue(site, queue_descr);

    return { id: q.id, description: q.descr, estimatedTime: 0, queueLength: q.tickets.length };
  }

  async updateSite(site: SiteInfo): Promise<SiteInfo> {
    return { description: site.description, position: site.position, queues: site.queues, id: site.id };
  }
}
