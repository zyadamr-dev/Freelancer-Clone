import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/domain/user/entities/User';
import { Job } from 'src/domain/job/entities/Job';
import { Offer } from 'src/domain/offer/entities/Offer';

export const databaseConfig = async (): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: '5734',
  database: 'freelancer',
  entities: [User, Job, Offer],
  synchronize: true, // Be careful using this in production
});
