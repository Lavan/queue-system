import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSiteDto, QueueInfo, SiteInfo, TicketInfo } from '@queue-system/api-interfaces';
import { generateRandomString, getEstimatedQueueTime } from '../utilities';

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
  tickets: Ticket[];
  last_advance_timestamp?: number;
  advance_deltas: number[]; // delta times in seconds
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
    tickets: [],
    advance_deltas: []
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

  // store timing for removal so we can use it in waittime calculation.
  const date = new Date();
  const curr_time = date.valueOf();
  const time_delta = queue.last_advance_timestamp ? curr_time - queue.last_advance_timestamp : 0;
  queue.last_advance_timestamp = curr_time;

  // Lets keep last x timestamps for now
  if (queue.advance_deltas.length >= 50) {
    queue.advance_deltas.shift();
  }

  queue.advance_deltas.push(time_delta / 1000);
  console.log(JSON.stringify(queue.advance_deltas));


  return queue.tickets.length;
};

const stubData = () => {
  console.log('Stubbing data!');
  const s = createSite('Systembolaget', 'site_1');
  const q = createQueue(s, 'Insläpp', 'queue_1');

  for (let i = 0; i < 30; i++) {
    createTicket(q);
  }

/*  setTimeout(() => {
    advanceQueue(q);
  }, 1500);

  setTimeout(() => {
    advanceQueue(q);
  }, 1000);

  setTimeout(() => {
    advanceQueue(q);
  }, 2000);

  setTimeout(() => {
    advanceQueue(q);
  }, 1750);*/

  printData();
};

const printData = () => {
  console.log(JSON.stringify(sites));
};

stubData();

@Injectable()
export class DatabaseService {
  /**
   * Get a site.
   *
   * @param siteId
   */
  async getSite(siteId: string): Promise<SiteInfo> {
    const site = sites[siteId];
    if (!site) {
      throw new NotFoundException();
    }
    const queue_ids = site.queues.map(queue => queue.id);
    return { description: site.descr, position: undefined, queues: queue_ids, id: siteId };
  }

  /**
   * Get all queues for a site.
   *
   * @param siteId
   */
  async getQueues(siteId: string): Promise<QueueInfo[]> {
    const site = sites[siteId];
    if (!site) {
      throw new NotFoundException();
    }
    return site.queues.map<QueueInfo>((queue: Queue) => ({
      id: queue.id,
      description: queue.descr,
      estimatedTime: getEstimatedQueueTime(queue.tickets.length, queue.advance_deltas),
      queueLength: queue.tickets.length
    }));
  }

  /**
   * Get a queue.
   *
   * @param queueId
   */
  async getQueue(queueId: string): Promise<QueueInfo> {
    const queue:Queue = queues[queueId];
    return { description: queue.descr, estimatedTime: getEstimatedQueueTime(queue.tickets.length, queue.advance_deltas), id: queueId, queueLength: queue.tickets.length };
  }

  /**
   * Get a queue.
   *
   * @param queueId
   */
  async advanceQueue(queueId: string): Promise<QueueInfo> {
    const queue:Queue = queues[queueId];
    advanceQueue(queue);

    return { description: queue.descr, estimatedTime: getEstimatedQueueTime(queue.tickets.length, queue.advance_deltas), id: queueId, queueLength: queue.tickets.length };
  }
  /**
   * Get a new ticket for specified queue
   *
   * @param queueId
   */
  async getTicket(queueId: string): Promise<TicketInfo> {
    const queue:Queue  = queues[queueId];
    const ticket = createTicket(queue);

    const num_ahead = queue.tickets.length - 1;

    return { description: queue.descr, estimatedTime: getEstimatedQueueTime(num_ahead, queue.advance_deltas), id: ticket.id, ticketNumber: ticket.nr };
  }

  /**
   * Get status for an existing ticket in a specified queue.
   *
   * @param queueId
   * @param ticketId
   */
  async getTicketStatus(queueId: string, ticketId: string): Promise<TicketInfo> {
    const ticket:Ticket = tickets[ticketId];
    const queue:Queue = queues[queueId];

    const num_ahead = ticket.nr - queue.current_nr;

    return { description: queue.descr, estimatedTime: getEstimatedQueueTime(num_ahead, queue.advance_deltas), id: ticketId, ticketNumber: ticket.nr };
  }

  /**
   * Add a new site.
   *
   * @param site
   */
  async addSite(site: CreateSiteDto): Promise<SiteInfo> {
    const s = createSite(site.description);
    return { description: s.descr, position: site.position, queues: [], id: s.id };
  }

  /**
   * Add a new queue to a specified site.
   *
   * @param siteId
   * @param queueDescription
   */
  async addQueue(siteId: string, queueDescription: string): Promise<QueueInfo> {
    const site = sites[siteId];
    const q = createQueue(site, queueDescription);

    return { id: q.id, description: q.descr, estimatedTime: 0, queueLength: 0 };
  }

  async updateSite(site: SiteInfo): Promise<SiteInfo> {
    return { description: site.description, position: site.position, queues: site.queues, id: site.id };
  }
}
