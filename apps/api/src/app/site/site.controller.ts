import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSiteDto, QueueInfo, SiteInfo } from '@queue-system/api-interfaces';
import { generateRandomString } from '../utilities';
import { DatabaseService } from '../database/database.service';

@Controller('site')
export class SiteController {

  constructor(private readonly databaseService: DatabaseService) {
  }

  @Post('register')
  async register(@Body() body: CreateSiteDto): Promise<SiteInfo> {
    console.log(body);
    return this.databaseService.addSite(body);
  }

  @Post(':site/update')
  async update(@Param() { site }, @Body() body): Promise<SiteInfo> {
    return this.databaseService.updateSite(body);
  }

  @Get(':site')
  async getSite(@Param() { site }): Promise<SiteInfo> {
    return this.databaseService.getSite(site);
  }

  @Get(':site/queues')
  async getQueues(@Param() { site }): Promise<QueueInfo[]> {
    const siteInfo = await this.databaseService.getSite(site);
    const queues = [];
    for (let queue of siteInfo.queues) {
      queues.push(await this.databaseService.getQueue(queue));
    }
    return queues;
  }

  @Post(':site/new')
  async getNewQueue(@Param() { site }): Promise<QueueInfo> {
    return { description: '', id: generateRandomString(), estimatedTime: 0, queueLength: 0 };
  }

  @Get(':site/:queue')
  getQueueInfo(@Param() { site, queue }): QueueInfo {
    return { description: '', id: queue, estimatedTime: 0, queueLength: 0 };
  }
}
