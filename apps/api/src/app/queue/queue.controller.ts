import { Controller, Get, Param } from '@nestjs/common';
import { Id, QueueInfo, TicketInfo } from '@queue-system/api-interfaces';

@Controller('queue')
export class QueueController {
  @Get(':queue')
  getQueue(@Param() { queue }): QueueInfo {
    return;
  }

  @Get(':queue/enter')
  getTicket(@Param() { queue }): Id {
    return;
  }

  @Get(':queue/:ticket')
  getTicketStatus(@Param() { queue, ticket }): TicketInfo {
    return;
  }
}
