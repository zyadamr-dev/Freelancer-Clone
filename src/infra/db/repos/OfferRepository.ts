import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from 'src/domain/offer/entities/Offer';
import { User } from 'src/domain/user/entities/User';
import { OfferStatus } from 'src/domain/offer/enums/OfferStatus';
import { IOfferRepo } from 'src/domain/offer/interfaces/OfferEntityInterface';
import { GetUserDto } from 'src/app/dtos/getUser.dto';

@Injectable()
export class OfferRepo implements IOfferRepo {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getFreelancers(
    jobId: string,
  ): Promise<{
    success: boolean;
    message: string;
    freelancers?: User[] | null;
  }> {
    try {
      const offers = await this.offerRepository.find({
        where: { job_id: jobId },
        relations: ['freelancers'],
      });

      const freelancerSet = new Set<User>();
      offers.forEach((offer) => {
        offer.freelancers.forEach((freelancer) =>
          freelancerSet.add(freelancer),
        );
      });

      const freelancers = Array.from(freelancerSet);
      if (freelancers.length === 0) {
        return { success: false, message: 'No freelancers found for this job' };
      }

      return {
        success: true,
        message: 'Freelancers fetched successfully',
        freelancers: freelancers,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to get freelancers: ${error.message}`,
      };
    }
  }

  async getOffer(
    offerId: string,
  ): Promise<{ success: boolean; message: string; offer?: Offer | null }> {
    try {
      const offer = await this.offerRepository.findOne({
        where: { id: offerId },
        relations: ['freelancers', 'job'],
      });

      if (!offer) {
        return { success: false, message: 'Offer not found' };
      }

      return {
        success: true,
        message: 'Offer fetched successfully',
        offer: offer,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to get offer: ${error.message}`,
      };
    }
  }

  async getOffers(): Promise<{
    success: boolean;
    message: string;
    offers?: Offer[];
  }> {
    try {
      const offers: Offer[] | null = await this.offerRepository.find({
        relations: ['freelancers', 'job'],
      });

      if (!offers || offers.length === 0) {
        return {
          success: false,
          message: 'No offers found',
          offers: [],
        };
      }

      return {
        success: true,
        message: 'Offers retrieved successfully',
        offers: offers,
      };
    } catch (error) {
      throw new Error(`Failed to get offers: ${error.message}`);
    }
  }

  async createOffer(
    offer: Offer,
  ): Promise<{ success: boolean; message: string; offer?: Offer }> {
    try {
      const createdOffer = await this.offerRepository.save(offer);
      return {
        success: true,
        message: 'Offer created successfully',
        offer: offer,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create offer: ${error.message}`,
      };
    }
  }

  async takeAction(
    offerId: string,
    status: OfferStatus,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.offerRepository.update(offerId, { status });
      if (result.affected && result.affected > 0) {
        return {
          success: true,
          message: `Offer ${offerId} status updated to ${status}`,
        };
      }
      return { success: false, message: `Offer ${offerId} not found` };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update offer status: ${error.message}`,
      };
    }
  }

  async applyToOffer(
    jobId: string,
    freelancerId: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      let offer = await this.offerRepository.findOne({
        where: { job_id: jobId },
        relations: ['freelancers'],
      });

      const freelancer = await this.userRepository.findOneBy({
        id: freelancerId,
      });
      if (!freelancer) {
        return {
          success: false,
          message: `Freelancer ${freelancerId} not found`,
        };
      }

      if (!offer) {
        offer = this.offerRepository.create({
          job_id: jobId,
          status: OfferStatus.Pending,
          freelancers: [freelancer],
        });
        await this.offerRepository.save(offer);
        return { success: true, message: 'Freelancer applied successfully' };
      }

      const alreadyApplied = offer.freelancers.some(
        (f) => f.id === freelancerId,
      );
      if (alreadyApplied) {
        return {
          success: false,
          message: 'Freelancer already applied to this offer',
        };
      }

      offer.freelancers.push(freelancer);
      await this.offerRepository.save(offer);

      return { success: true, message: 'Freelancer applied successfully' };
    } catch (error) {
      return {
        success: false,
        message: `Failed to apply to offer: ${error.message}`,
      };
    }
  }
}
