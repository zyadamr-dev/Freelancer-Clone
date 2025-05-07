import { Inject, Injectable } from '@nestjs/common';
import { IOfferRepo } from 'src/domain/offer/interfaces/OfferEntityInterface';
import { User } from 'src/domain/user/entities/User';

@Injectable()
export class GetFreelancersUseCase {
  constructor(@Inject('IOfferRepo') private readonly offerRepo: IOfferRepo) {}

  async execute(
    id: string,
  ): Promise<{
    success: boolean;
    message: string;
    freelancers?: User[] | null;
  }> {
    const result = await this.offerRepo.getFreelancers(id);

    if (!result.freelancers || result.freelancers.length === 0) {
      return {
        success: true,
        message: 'No freelancers found for this job.',
        freelancers: result.freelancers,
      };
    }

    return result;
  }
}
