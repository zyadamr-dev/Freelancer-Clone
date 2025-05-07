import { Inject, Injectable } from '@nestjs/common';
import { Job } from 'src/domain/job/entities/Job';
import { IJobRepo } from 'src/domain/job/interfaces/JobEntityInterface';
import { GetJobDto } from 'src/app/dtos/getJob.dto';

@Injectable()
export class GetJobUseCase {
  constructor(@Inject('IJobRepo') private readonly jobRepo: IJobRepo) {}

  async execute(id: string): Promise<GetJobDto | null> {
    const job = await this.jobRepo.getJob(id);
    if (!job) throw new Error('Job is no longer available');
    return job;
  }
}
