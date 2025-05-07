import { Inject, Injectable } from '@nestjs/common';
import { IOfferRepo } from 'src/domain/offer/interfaces/OfferEntityInterface';
import { Offer } from 'src/domain/offer/entities/Offer';

@Injectable()
export class ApplyToOfferUseCase {
  constructor(@Inject('IOfferRepo') private readonly offerRepo: IOfferRepo) {}

  async execute(
    offerId: string,
    freelancerId: string,
  ): Promise<{ success: boolean; message: string }> {
    const offer = await this.offerRepo.applyToOffer(offerId, freelancerId);
    if (!offer) return { success: false, message: 'There is no offer' };
    return { success: true, message: 'Assigned to offer successfully' };
  }
}
