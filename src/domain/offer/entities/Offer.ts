import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { OfferStatus } from '../enums/OfferStatus';
import { Job } from 'src/domain/job/entities/Job';
import { User } from 'src/domain/user/entities/User';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: OfferStatus,
    default: OfferStatus.Pending,
  })
  status: OfferStatus;

  // Many freelancers can apply to one offer
  @ManyToMany(() => User, (user) => user.offers)
  @JoinTable({
    name: 'offer_freelancers', // This is the join table
    joinColumn: {
      name: 'offer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'freelancer_id',
      referencedColumnName: 'id',
    },
  })
  freelancers: User[];

  // Many Offers can be submitted to one Job
  @ManyToOne(() => Job, (job) => job.offers)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @Column()
  job_id: string;
}
