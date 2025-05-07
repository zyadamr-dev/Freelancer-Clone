import { Offer } from 'src/domain/offer/entities/Offer';
import { OfferStatus } from 'src/domain/offer/enums/OfferStatus';

export class GetOfferDto {
  id: string;
  status: OfferStatus;
  freelancerEmails: string[];
  jobId: string;

  constructor(offer: Offer) {
    this.id = offer.id;
    this.status = offer.status;
    this.freelancerEmails = offer.freelancers?.length
      ? offer.freelancers.map((f) => f.email)
      : ['Unknown'];
    this.jobId = offer.job_id;
  }
}
