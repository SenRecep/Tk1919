import { Column, Entity, OneToMany } from 'typeorm';
import { EntityBase } from './EntityBase.entity';
import { Ticket } from './Ticket.entity';

export enum Genger {
  Male,
  Female,
  Girl,
  Boy,
}

@Entity({ name: 'passengers' })
export class Passenger extends EntityBase {
  @Column({ name: 'firstName', nullable: false, length: 45 })
  firstName: string;
  @Column({ name: 'lastName', nullable: false, length: 45 })
  lastName: string;
  @Column({ name: 'email', nullable: false, length: 45 })
  email: string;
  @Column({ name: 'phoneNumber', nullable: false, length: 45 })
  phoneNumber: string;
  @Column({ type: 'date', name: 'birthDay', nullable: false })
  birthDay: Date;
  @Column({
    type: 'enum',
    enum: Genger,
    name: 'gender',
    nullable: false,
    default: Genger.Male,
  })
  gender: Genger;
  @Column({ name: 'isTurkish', nullable: false })
  isTurkish: boolean;
  @Column({ name: 'identityNumber', nullable: true, length: 11 })
  identityNumber: string;
  @Column({ name: 'spp', nullable: true, length: 45 })
  spp: string;
  @OneToMany(() => Ticket, (ticket) => ticket.passenger)
  tickets: Ticket[];
}
