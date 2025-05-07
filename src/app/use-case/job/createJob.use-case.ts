import { Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from 'src/app/dtos/createJob.dto';
import { Job } from 'src/domain/job/entities/Job';
import { IJobRepo } from 'src/domain/job/interfaces/JobEntityInterface';

@Injectable()
export class CreateJobUseCase {
  constructor(@Inject('IJobRepo') private readonly jobRepo: IJobRepo) {}

  async execute(job: CreateJobDto): Promise<Job> {
    return await this.jobRepo.createJob(job);
  }
}
