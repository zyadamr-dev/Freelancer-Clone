import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/domain/user/entities/User';
import { Offer } from 'src/domain/offer/entities/Offer';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  budget: number;

  @Column()
  deadline: string;

  // One Client can have many jobs
  @ManyToOne(() => User, (user) => user.jobs)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @Column()
  client_id: string;

  // One Job can have many Offers
  @OneToMany(() => Offer, (offer) => offer.job, { nullable: true })
  offers: Offer[];
}
