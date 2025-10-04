import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepo.find();
  }
  async findOne(id: number) {
    const userFind = await this.usersRepo.findOne({ where: { id } });
    if (!userFind) throw new NotFoundException(`User with id ${id} not found`);
    return userFind;
  }
  create(newUser: CreateUserDTO) {
    const userCreated = this.usersRepo.create(newUser);
    return this.usersRepo.save(userCreated);
  }
  async update(id: number, updatedUser: UpdateUserDTO) {
    await this.usersRepo.update(id, updatedUser);
    return this.usersRepo.findOne({ where: { id } });
  }
  async remove(id: number) {
    const result = await this.usersRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`User with id ${id} not found`);
    return { message: `User with id ${id} removed successfully` };
  }
}
