import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GetJobUseCase } from 'src/app/use-case/job/getJob.user-case';
import { CreateJobUseCase } from 'src/app/use-case/job/createJob.use-case';
import { GetJobsUseCase } from 'src/app/use-case/job/getJobs.user-case';
import { Job } from 'src/domain/job/entities/Job';
import { CreateJobDto } from 'src/app/dtos/createJob.dto';
import { GetJobDto } from 'src/app/dtos/getJob.dto';
import { Roles } from '../auth/role.decorator';
import { RolesGuard } from '../auth/roleGuard';
import { UserRole } from 'src/domain/user/enums/UserRole';
import { AuthenticatedRequest } from '../auth/requestInterface';
import { AuthGuard } from '@nestjs/passport';

@Controller('job')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class JobController {
  constructor(
    private readonly createJ: CreateJobUseCase,
    private readonly getJ: GetJobUseCase,
    private readonly getJs: GetJobsUseCase,
  ) {}

  @Get()
  @Roles(UserRole.Freelancer)
  async getJobs(@Req() req: AuthenticatedRequest): Promise<GetJobDto[] | null> {
    const userId = req.user.userId;
    console.log(userId);
    return await this.getJs.execute();
  }

  @Get(':id')
  async getJob(@Param('id') id: string): Promise<GetJobDto | null> {
    return await this.getJ.execute(id);
  }

  @Post()
  @Roles(UserRole.Client)
  async createJob(
    @Req() req: AuthenticatedRequest,
    @Body() data: CreateJobDto,
  ): Promise<Job> {
    const clientId = req.user.userId;
    const jobData = { ...data, clientId };
    return await this.createJ.execute(jobData);
  }
}
