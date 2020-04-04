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
    return await this.databaseService.getQueues(site);
  }

  @Post(':site/new')
  async getNewQueue(@Param() { site }, @Body() body): Promise<QueueInfo> {
    console.log(site, body);
    return await this.databaseService.addQueue(site, body.description);
  }

  @Get(':site/:queue')
  async getQueueInfo(@Param() { site, queue }): Promise<QueueInfo> {
    return await this.databaseService.getQueue(queue);
  }
}
