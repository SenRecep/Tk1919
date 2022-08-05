import { Column, Entity, OneToMany } from 'typeorm';
import { EntityBase } from './EntityBase.entity';
import { Ticket } from './Ticket.entity';

@Entity({ name: 'air_flights' })
export class AirFlight extends EntityBase {
  @Column({ type: 'date', name: 'arrival', nullable: false })
  arrival: Date;
  @Column({ type: 'date', name: 'departure', nullable: false })
  departure: Date;
  @Column({ name: 'from', nullable: false, length: 45 })
  from: string;
  @Column({ name: 'to', nullable: false, length: 45 })
  to: string;
  @Column({ type: 'money', name: 'price', nullable: false })
  price: number;
  @Column({ type: 'int', name: 'passengerCount', nullable: true, default: 0 })
  passengerCount: number;
  @Column({ type: 'int', name: 'capacity ', nullable: false })
  capacity: number;
  @Column({ name: 'duration ', nullable: false })
  duration: string;
  @OneToMany(() => Ticket, (ticket) => ticket.airFlight)
  tickets: Ticket[];
}
