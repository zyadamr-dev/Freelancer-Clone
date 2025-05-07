import { Job } from '../entities/Job';
import { CreateJobDto } from 'src/app/dtos/createJob.dto';

export interface IJobRepo {
  createJob(job: CreateJobDto): Promise<Job>;
  getJob(id: string): Promise<Job | null>;
  getJobs(): Promise<Job[] | null>;
}
