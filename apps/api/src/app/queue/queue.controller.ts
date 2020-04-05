import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QueueInfo, TicketInfo } from '@queue-system/api-interfaces';
import { DatabaseService } from '../database/database.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly databaseService: DatabaseService) {
  }

  @Get(':queue')
  async getQueue(@Param() { queue }): Promise<QueueInfo> {
    const { currentTicket, ...queueInfo } = await this.databaseService.getQueue(queue);
    return queueInfo;
  }

  @Post(':queue/enter')
  async getTicket(@Param() { queue }): Promise<TicketInfo> {
    return this.databaseService.getTicket(queue);
  }

  @Get(':queue/:ticket')
  async getTicketStatus(@Param() { queue, ticket }): Promise<TicketInfo> {
    return this.databaseService.getTicketStatus(queue, ticket);
  }

  @Delete(':queue/:ticket')
  async removeTicket(@Param() { queue, ticket }) {
    return this.databaseService.removeTicket(queue, ticket);
  }
}
