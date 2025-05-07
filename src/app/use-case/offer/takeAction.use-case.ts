import { Inject, Injectable } from '@nestjs/common';
import { IOfferRepo } from 'src/domain/offer/interfaces/OfferEntityInterface';
import { OfferStatus } from 'src/domain/offer/enums/OfferStatus';

@Injectable()
export class TakeActionUseCase {
  constructor(@Inject('IOfferRepo') private readonly offerRepo: IOfferRepo) {}

  async execute(
    offerId: string,
    status: OfferStatus,
  ): Promise<{ success: boolean; message: string }> {
    return await this.offerRepo.takeAction(offerId, status);
  }
}
