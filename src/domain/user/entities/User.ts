import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { UserRole } from '../enums/UserRole';
import { Job } from 'src/domain/job/entities/Job';
import { Offer } from 'src/domain/offer/entities/Offer';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
  includes(freelancerId: string) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  company: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Client,
  })
  role: UserRole;

  // A client can post many jobs
  @OneToMany(() => Job, (job) => job.client)
  jobs: Job[];

  // A freelancer can submit many offers
  @ManyToMany(() => Offer, (offer) => offer.freelancers)
  offers: Offer[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
