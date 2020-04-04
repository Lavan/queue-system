export interface Id {
  id: string;
}

export class Position {
  long: number;
  lat: number;
}

export class SiteInfo {
  id: string;
  description: string;
  position: Position;
  queues: string[];
}

export class CreateSiteDto {
  description: string;
  position?: Position;
}

export class QueueInfo {
  id: string;
  description: string;
  estimatedTime: number;
  queueLength: number;
}

export class TicketInfo {
  id: string;
  description: string;
  estimatedTime: number;
  ticketNumber: number;
}
