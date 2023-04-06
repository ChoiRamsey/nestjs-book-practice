import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    // return this.appService.getHello();
    return process.env.DATABASE_HOST;
  }

  @Get(':aId/test/:bId')
  getParams(@Param() params: { [key: string]: string }) {
    console.log(0, params);
    console.log(1, Object.keys(params));
    console.log(2, params.aId, params.bId);
    return 'Params test finished!';
  }

  @Get('test/:cId')
  getParam(@Param('cId') cId: string): string {
    return `the data type of ${cId} is not the number!`;
  }

  @Get('dbhost')
  getDBhostfromConfigService(): string {
    return this.configService.get('DATABASE_HOST');
  }
}
