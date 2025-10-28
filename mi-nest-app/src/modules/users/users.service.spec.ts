import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt'

const usersFake = [
  {
    id: 1,
    name: 'Alejandra',
    email: 'ag@gmail.com',
    password: '123123',
    age: 25,
    role: 'admin',
  },
  {
    id: 2,
    name: 'Gutierrez',
    email: 'gutierrez@gmail.com',
    password: '123123',
    role: 'admin',
  },
];

jest.mock('bcrypt');

describe('UserService', () => {
  let service: UsersService;
  let fakeRepo;

  beforeEach(() => {
    jest.clearAllMocks();
    fakeRepo = {
      find: jest.fn().mockResolvedValue(usersFake),
      findOne: jest.fn().mockResolvedValue(usersFake),
      findByName: jest.fn().mockResolvedValue(usersFake),
      create: jest.fn().mockResolvedValue(usersFake),
      save: jest.fn().mockResolvedValue(usersFake),
      update: jest.fn().mockResolvedValue(usersFake),
      delete: jest.fn().mockResolvedValue(usersFake),
    };
    service = new UsersService(fakeRepo as any);
  });
  it('Deberia devolver todos los usuarios', async () => {
    const users = await service.findAll();
    expect(users.length).toBeGreaterThan(0);
    expect(fakeRepo.find).toHaveBeenCalled();
  });
  it('Deberia devolver un usuario por id ', async () => {
    fakeRepo.findOne.mockResolvedValue(usersFake[0]);
    const result = await service.findOne(1);
    expect(result.email).toEqual('ag@gmail.com');
  });
  it('Deberia devolver un usuario por nombre', async () => {
    fakeRepo.find.mockResolvedValue(usersFake[0]);
    const result = await service.findByName('Alejandra');
    expect(result.name).toEqual('Alejandra');
  });
  it('Deberia lanzar NotFoundExeption si el ususario no existe', async () => {
    fakeRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
  });
  it('Deberia crear un nuevo usuario', async () => {
    const newUserMock = {
      name: 'Alisson',
      email: 'alisso@gmail.com',
      password: '123456',
    };
    fakeRepo.save.mockResolvedValue({ id: 3, ...newUserMock });
    const result = await service.create(newUserMock as any);
    expect(result.id).toBe(3);
  });
  it('Deberia actualizar un usuario', async() => {
    const updatedUserMock = {id: 1, name: 'Alejandra Gutierrez', role: 'admin' }
    fakeRepo.update.mockResolvedValue({ affected: 1 })
    fakeRepo.findOne.mockResolvedValue(updatedUserMock)

    const result = await service.update(1, { name: 'Alejandra Gutierrez', role: 'admin'})
    expect(fakeRepo.update).toHaveBeenCalledWith(1, { name: 'Alejandra Gutierrez', role: 'admin'})
    expect(result.name).toEqual('Alejandra Gutierrez')
  });
  it('Deberia actualizar un usuario y encriptar la nueva contraseña', async() =>{
    const updatedUser = { id: 1, name: 'Alejandra Gutierrez', role: "admin", password: 'newpass' };
        (bcrypt.hash as jest.Mock).mockResolvedValue('new_hashed_password');
        fakeRepo.update.mockResolvedValue({ affected: 1 })
        fakeRepo.findOne.mockResolvedValue({ ...updatedUser, password: 'new_hashed_password' })

        const result = await service.update(1, updatedUser as any)
        expect(bcrypt.hash).toHaveBeenCalledWith('newpass', 10)
        expect(fakeRepo.update).toHaveBeenCalledWith(1, { ...updatedUser, password: 'new_hashed_password' })
        expect(result.password).toBe('new_hashed_password')
  });
  it('Deberia eliminar un usuario', async() =>{
    fakeRepo.delete.mockResolvedValue({ affected: 1})
    const result = await service.remove(1)
    expect(fakeRepo.delete).toHaveBeenCalledWith(1)
    expect(result).toEqual({ message: `User with id 1 removed successfully` })
  });

});
