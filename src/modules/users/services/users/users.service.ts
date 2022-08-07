import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/CreateUser.dto';
import { UpdateUserDto } from '../../dto/UpdateUser.dto';
import { UserListDto } from '../../dto/UserList.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  async getUsers() {
    const data = await this.repository.find();
    return data.map((user) => new UserListDto(user));
  }
  async createUser(createUserDto: CreateUserDto) {
    const isExist = await this.findByUserEmail(createUserDto.email);
    if (isExist) throw new BadRequestException('Email already exist');
    const password = encodePassword(createUserDto.password);
    const user = this.repository.create({ ...createUserDto, password });
    return await this.repository.save(user);
  }
  async findByUserEmail(email: string) {
    const data = await this.repository.findOne({ where: { email } });
    if (!data) return null;
    return new UserListDto(data);
  }
  async findById(id: number) {
    const data = await this.repository.findOne({ where: { id } });
    if (!data) return null;
    return new UserListDto(data);
  }
  async updateAsync(id: number, updateDto: UpdateUserDto): Promise<User> {
    const found = await this.repository.findOne({
      where: { id },
    });
    if (!found) throw new NotFoundException('User not found');
    console.log('found', found);
    if (updateDto.email && updateDto.email !== found.email) {
      const isExist = await this.findByUserEmail(updateDto.email);
      if (isExist) throw new BadRequestException('Email already exist');
      found.email = updateDto.email;
    }
    if (updateDto.password) found.password = encodePassword(updateDto.password);
    if (updateDto.firstName) found.firstName = updateDto.firstName;
    if (updateDto.lastName) found.lastName = updateDto.lastName;

    found.isDeleted = false;
    await this.repository.update({ id }, { ...found });
    console.log('updated', found);
    return found;
  }
}
