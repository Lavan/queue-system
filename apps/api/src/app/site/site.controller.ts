import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Message } from '@queue-system/api-interfaces';

@Controller('site')
export class SiteController {
  @Post('register')
  register(@Body() body): Message {
    return;
  }

  @Get(':site')
  getSite(@Param() { site }): Message {
    return;
  }

  @Get(':site/queues')
  getQueues(@Param() { site }): Message {
    return;
  }

  @Get(':site/:queue')
  getQueueInfo(@Param() { site, queue }): Message {
    return;
  }
}
