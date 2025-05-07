import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user/entities/User';
import { Offer } from 'src/domain/offer/entities/Offer';
import { OfferController } from 'src/infra/controllers/OfferController';
import { OfferRepo } from 'src/infra/db/repos/OfferRepository';
import { ApplyToOfferUseCase } from '../use-case/offer/applyToOffer.use-case';
import { GetFreelancersUseCase } from '../use-case/offer/getFreelancers.use-case';
import { GetOfferUseCase } from '../use-case/offer/getOffer.use-case';
import { GetOffersUseCase } from '../use-case/offer/getOffers.use-case';
import { TakeActionUseCase } from '../use-case/offer/takeAction.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, User])],
  controllers: [OfferController],
  providers: [
    OfferRepo,
    {
      provide: 'IOfferRepo',
      useClass: OfferRepo,
    },
    ApplyToOfferUseCase,
    GetFreelancersUseCase,
    GetOffersUseCase,
    GetOfferUseCase,
    TakeActionUseCase,
  ],
  exports: [],
})
export class OfferModule {}
