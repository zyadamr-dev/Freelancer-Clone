import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/domain/job/entities/Job';
import { JobController } from 'src/infra/controllers/JobController';
import { JobRepo } from 'src/infra/db/repos/JobRepository';
import { GetJobUseCase } from '../use-case/job/getJob.user-case';
import { GetJobsUseCase } from '../use-case/job/getJobs.user-case';
import { CreateJobUseCase } from '../use-case/job/createJob.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobController],
  providers: [
    JobRepo,
    {
      provide: 'IJobRepo',
      useClass: JobRepo,
    },
    GetJobUseCase,
    GetJobsUseCase,
    CreateJobUseCase,
  ],
  exports: [],
})
export class JobModule {}
