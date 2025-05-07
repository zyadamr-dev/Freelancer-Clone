import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/infra/db/database.config';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/domain/user/entities/User';
import { Job } from 'src/domain/job/entities/Job';
import { Offer } from 'src/domain/offer/entities/Offer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Global config for env vars
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
      //   inject: [ConfigService], // Inject ConfigService to access env variables
    }),
    TypeOrmModule.forFeature([User, Job, Offer]),
  ],
})
export class DatabaseModule {}
