import { Controller, Get, Param } from '@nestjs/common';
import { Message } from '@queue-system/api-interfaces';

@Controller('queue')
export class QueueController {
  @Get(':queue')
  getQueue(@Param() { queue }): Message {
    return;
  }

  @Get(':queue/enter')
  getTicket(@Param() { queue }): Message {
    return;
  }

  @Get(':queue/:ticket')
  getTicketStatus(@Param() { queue, ticket }): Message {
    return;
  }
}
