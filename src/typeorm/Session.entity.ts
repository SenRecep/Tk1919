import { ISession } from 'connect-typeorm/out';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'sessions' })
export class SessionEntity implements ISession {
  @Index()
  @Column('bigint')
  expiredAt = Date.now();
  @PrimaryColumn('varchar', { length: 255 })
  id = '';
  @Column('text')
  json = '';
  @Column('date', { nullable: true })
  destroyedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
