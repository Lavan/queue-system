export interface Id {
  id: string;
}

export class Position {
  long: number;
  lat: number;
}

export class SiteInfo {
  id: string;
  name: string;
  position: Position;
}

export class QueueInfo {
  id: string;

}

export class TicketInfo {
  id: string;
}
