import { Controller, Get, HostParam } from '@nestjs/common';

// @Controller({ host: 'api.localhost' })
@Controller({ host: ':version.api.localhost' })
export class ApiController {
  @Get()
  // index(): string {
  //   return 'Hello, API!';
  // }
  index(@HostParam('version') version: string): string {
    return `Hello, host param is ${version}`;
  }
}
