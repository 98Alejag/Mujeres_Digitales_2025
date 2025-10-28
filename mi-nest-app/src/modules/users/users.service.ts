import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  async findByName(name: string): Promise<User[]> {
    const users = await this.usersRepo.find({
      where: { name: ILike(`%${name}%`) },
    });
    if (users.length === 0) {
      throw new NotFoundException(`No users found with name: ${name}`);
    }

    return users;
  }
  create(newUser: CreateUserDTO) {
    const userCreated = this.usersRepo.create(newUser);
    return this.usersRepo.save(userCreated);
  }
  async update(id: number, updateUser: UpdateUserDTO) {
    const dataToUpdate = { ...updateUser };
    let dataWithPassword;

    if (updateUser.password) {
      const hashedPassword = await bcrypt.hash(updateUser.password, 10);
      dataWithPassword = { ...dataToUpdate, password: hashedPassword };
    }

    await this.usersRepo.update(
      id,
      updateUser.password ? dataWithPassword : dataToUpdate,
    );
    return this.findOne(id);
  }
  async remove(id: number) {
    const result = await this.usersRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`User with id ${id} not found`);
    return { message: `User with id ${id} removed successfully` };
  }
}
  