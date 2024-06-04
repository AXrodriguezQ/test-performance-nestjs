import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UnusedRoute } from './helpers/otherRoutes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.index();
  }

  @Get('*')
  getOthersRoutes(): UnusedRoute {
    return this.appService.othersRoutes();
  }

}
