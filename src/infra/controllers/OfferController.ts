import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApplyToOfferUseCase } from 'src/app/use-case/offer/applyToOffer.use-case';
import { GetFreelancersUseCase } from 'src/app/use-case/offer/getFreelancers.use-case';
import { GetOfferUseCase } from 'src/app/use-case/offer/getOffer.use-case';
import { GetOffersUseCase } from 'src/app/use-case/offer/getOffers.use-case';
import { OfferStatus } from 'src/domain/offer/enums/OfferStatus';
import { Roles } from '../auth/role.decorator';
import { RolesGuard } from '../auth/roleGuard';
import { UserRole } from 'src/domain/user/enums/UserRole';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from '../auth/requestInterface';
import { TakeActionUseCase } from 'src/app/use-case/offer/takeAction.use-case';

@Controller('offer')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OfferController {
  constructor(
    private readonly getf: GetFreelancersUseCase,
    private readonly getOffs: GetOffersUseCase,
    private readonly getOff: GetOfferUseCase,
    private readonly applyOff: ApplyToOfferUseCase,
    private readonly takeAc: TakeActionUseCase,
  ) {}

  @Get('freelancers/:jobId')
  @Roles(UserRole.Client)
  async getFreelancers(@Param('jobId') jobId: string) {
    const result = await this.getf.execute(jobId);
    return result;
  }

  @Get('offers')
  @Roles(UserRole.Client)
  async getOffers() {
    const result = await this.getOffs.execute();
    return {
      success: true,
      message: 'Offers retrieved successfully',
      offers: result,
    };
  }

  @Get(':offerId')
  async getOffer(@Param('offerId') offerId: string) {
    const result = await this.getOff.execute(offerId);
    return result;
  }

  @Patch(':offerId')
  @Roles(UserRole.Client)
  async takeAction(
    @Body('status') status: OfferStatus,
    @Param('offerId') offerId: string,
  ) {
    const result = await this.takeAc.execute(offerId, status);
    return {
      success: true,
      message: result,
    };
  }

  @Post(':jobId')
  @Roles(UserRole.Freelancer)
  async applyToOffer(
    @Param('jobId') jobId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const freelancerId = req.user.userId;
    const result = await this.applyOff.execute(jobId, freelancerId);
    return {
      success: true,
      message: result ? 'Applied successfully' : 'Failed to apply',
    };
  }
}
