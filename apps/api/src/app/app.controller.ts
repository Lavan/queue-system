import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Message } from '@queue-system/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }
}
