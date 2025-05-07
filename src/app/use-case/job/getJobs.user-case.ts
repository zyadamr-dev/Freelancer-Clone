import { Inject, Injectable } from '@nestjs/common';
import { Job } from 'src/domain/job/entities/Job';
import { IJobRepo } from 'src/domain/job/interfaces/JobEntityInterface';
import { GetJobDto } from 'src/app/dtos/getJob.dto';

@Injectable()
export class GetJobsUseCase {
  constructor(@Inject('IJobRepo') private readonly jobRepo: IJobRepo) {}

  async execute(): Promise<GetJobDto[] | null> {
    const jobs = await this.jobRepo.getJobs();
    if (!jobs) throw new Error('No jobs currently available');
    return jobs;
  }
}
