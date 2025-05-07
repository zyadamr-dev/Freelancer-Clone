import { Offer } from '../entities/Offer';
import { OfferStatus } from '../enums/OfferStatus';
import { User } from 'src/domain/user/entities/User';

export interface IOfferRepo {
  getFreelancers(
    jobId: string,
  ): Promise<{
    success: boolean;
    message: string;
    freelancers?: User[] | null;
    length?: number;
  }>;
  getOffer(
    offerId: string,
  ): Promise<{ success: boolean; message: string; offer?: Offer | null }>;
  getOffers(): Promise<{ success: boolean; message: string; offers?: Offer[] }>;
  createOffer(
    offer: Offer,
  ): Promise<{ success: boolean; message: string; offer?: Offer }>;
  takeAction(
    offerId: string,
    status: OfferStatus,
  ): Promise<{ success: boolean; message: string }>;
  applyToOffer(
    jobId: string,
    freelancerId: string,
  ): Promise<{ success: boolean; message: string }>;
}
