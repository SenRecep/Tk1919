import { AirFlight } from './AirFlight.entity';
import { Passenger } from './Passenger.entity';
import { Ticket } from './Ticket.entity';
import { User } from './User.entity';
import { SessionEntity } from './Session.entity';

export { AirFlight };
export { Passenger };
export { Ticket };
export { User };
export { SessionEntity };

const entities = [AirFlight, Passenger, Ticket, User, SessionEntity];

export default entities;
