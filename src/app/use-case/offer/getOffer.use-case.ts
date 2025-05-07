import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOfferRepo } from 'src/domain/offer/interfaces/OfferEntityInterface';
import { GetOfferDto } from 'src/app/dtos/getOffer.dto';
import { Offer } from 'src/domain/offer/entities/Offer';

@Injectable()
export class GetOfferUseCase {
  constructor(@Inject('IOfferRepo') private readonly offerRepo: IOfferRepo) {}

  async execute(
    id: string,
  ): Promise<{ success: boolean; message: string; offer?: Offer | null }> {
    const result = await this.offerRepo.getOffer(id);

    if (!result.offer) {
      throw new NotFoundException('Offer not found');
    }

    return {
      success: true,
      message: 'Got the offer successfully',
      offer: result.offer,
    };
  }
}
