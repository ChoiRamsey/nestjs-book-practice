import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':aId/test/:bId')
  getParams(@Param() params: { [key: string]: string }) {
    console.log(0, params);
    console.log(1, Object.keys(params));
    console.log(2, params.aId, params.bId);
    return 'Params test finished!';
  }

  @Get(':cId')
  getParam(@Param('cId') cId: string): string {
    return `the data type of ${cId} is not the number!`;
  }
}
