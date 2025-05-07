import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto } from 'src/app/dtos/createJob.dto';
import { Job } from 'src/domain/job/entities/Job';
import { IJobRepo } from 'src/domain/job/interfaces/JobEntityInterface';

@Injectable()
export class JobRepo implements IJobRepo {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
  ) {}

  async getJob(id: string): Promise<Job | null> {
    try {
      const job = await this.jobRepo.findOne({ where: { id } });
      return job;
    } catch (error) {
      console.error('Failed to fetch job:', error);
      return null;
    }
  }

  async getJobs(): Promise<Job[] | null> {
    try {
      const jobs = await this.jobRepo.find();
      return jobs;
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      return null;
    }
  }

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    try {
      const newJob = this.jobRepo.create({
        title: createJobDto.title,
        description: createJobDto.description,
        budget: createJobDto.budget,
        deadline: createJobDto.deadline,
        client_id: createJobDto.clientId,
      });
      return await this.jobRepo.save(newJob);
    } catch (error) {
      console.error('Failed to create job:', error);
      throw error;
    }
  }
}
