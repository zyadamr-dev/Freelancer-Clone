import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOfferRepo } from 'src/domain/offer/interfaces/OfferEntityInterface';
import { GetOfferDto } from 'src/app/dtos/getOffer.dto';
import { Offer } from 'src/domain/offer/entities/Offer';

@Injectable()
export class GetOffersUseCase {
  constructor(@Inject('IOfferRepo') private readonly offerRepo: IOfferRepo) {}

  async execute(): Promise<GetOfferDto[]> {
    const result = await this.offerRepo.getOffers();

    if (!result.offers || result.offers.length === 0) {
      throw new NotFoundException('No offers found');
    }

    return result.offers.map((offer) => new GetOfferDto(offer));
  }
}
