import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './app/modules/database.module';
import { UserModule } from './app/modules/user.module';
import { JobModule } from './app/modules/job.module';
import { OfferModule } from './app/modules/offer.module';
import { AuthModule } from './app/modules/jwt.module';

@Module({
  imports: [DatabaseModule, UserModule, JobModule, OfferModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
