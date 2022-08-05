/*
	[baggage] [varchar](45) NOT NULL,
	[cabin_baggage] [varchar](45) NOT NULL
    user
    flight
*/

export enum Class {
  Economy,
  Business,
  First,
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AirFlight } from './AirFlight.entity';
import { EntityBase } from './EntityBase.entity';
import { Passenger } from './Passenger.entity';

@Entity({ name: 'tickets' })
export class Ticket extends EntityBase {
  @Column({ name: 'pnr', nullable: false, length: 10 })
  pnr: string;
  @Column({ name: 'seatNumber', nullable: false, length: 10 })
  seatNumber: string;
  @Column({
    type: 'enum',
    enum: Class,
    name: 'class',
    nullable: false,
  })
  class: Class;
  @Column({ name: 'meal', nullable: false, length: 20 })
  meal: string;
  @Column({ name: 'baggage', nullable: false })
  baggage: number;
  @Column({ name: 'cabinBaggage', nullable: false })
  cabinBaggage: number;
  @ManyToOne(() => Passenger)
  @JoinColumn()
  passenger: Passenger;
  @ManyToOne(() => AirFlight)
  @JoinColumn()
  airFlight: AirFlight;
}
