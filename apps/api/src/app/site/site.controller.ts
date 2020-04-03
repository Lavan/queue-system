import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Id, QueueInfo, SiteInfo } from '@queue-system/api-interfaces';
import { generateRandomString } from '../utilities';

@Controller('site')
export class SiteController {
  @Post('register')
  register(@Body() body): Id {
    return { id: generateRandomString() };
  }

  @Post(':site/update')
  update(@Body() body): Id {
    return { id: generateRandomString() };
  }

  @Get(':site')
  getSite(@Param() { site }): SiteInfo {
    return;
  }

  @Get(':site/queues')
  getQueues(@Param() { site }): QueueInfo[] {
    return;
  }

  @Get(':site/newqueue')
  getNewQueue(@Param() { site }): QueueInfo {
    return { id: generateRandomString() };
  }

  @Get(':site/:queue')
  getQueueInfo(@Param() { site, queue }): QueueInfo {
    return;
  }
}
