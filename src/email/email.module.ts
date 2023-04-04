import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService], // 최종적으로 사용되는 UsersService가 속한 UsersModule에서 사용하도록 내보내기
})
export class EmailModule {}
