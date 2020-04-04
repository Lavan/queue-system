import { Controller, Get, Param } from '@nestjs/common';
import { Id, QueueInfo, TicketInfo } from '@queue-system/api-interfaces';
import { DatabaseService } from '../database/database.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly databaseService:DatabaseService) {
  }

  @Get(':queue')
  async getQueue(@Param() { queue }): Promise<QueueInfo> {
    return this.databaseService.getQueue(queue);
  }

  @Get(':queue/enter')
  async getTicket(@Param() { queue }): Promise<TicketInfo> {
    return this.databaseService.getTicket(queue);
  }

  @Get(':queue/:ticket')
  async getTicketStatus(@Param() { queue, ticket }): Promise<TicketInfo> {
    return this.databaseService.getTicketStatus(queue, ticket);
  }
}
