import { RolesEnum } from "src/entities/user.entity"
import { Roles } from "../auth/roles.decorator"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { NotFoundException } from "@nestjs/common"


const usersFake = [
  {
    id: 1,
    name: 'Alejandra',
    email: 'ag@gmail.com',
    password: '123123',
    age: 25,
    role: RolesEnum.ADMIN ,
  },
  {
    id: 2,
    name: 'Gutierrez',
    email: 'gutierrez@gmail.com',
    password: '123123',
    role: RolesEnum.ADMIN ,
  },
];

describe('UsersController', () => {
    let controller: UsersController
    let service: jest.Mocked<UsersService>

    beforeEach(() => {
        service = {
            findAll: jest.fn().mockResolvedValue(usersFake),
            findOne: jest.fn().mockResolvedValue(usersFake),
            findByName: jest.fn().mockResolvedValue(usersFake),
            create: jest.fn().mockResolvedValue(usersFake),
            save: jest.fn().mockResolvedValue(usersFake),
            update: jest.fn().mockResolvedValue(usersFake),
            delete: jest.fn().mockResolvedValue(usersFake),
        } as any

        controller = new UsersController(service)
    })
    it('Deberia devolver todos los usuarios', async () => {
        service.findAll.mockResolvedValue(usersFake)
        const users = await controller.findAll()

        expect(users.length).toBeGreaterThan(0)
        expect(users).toEqual(usersFake)

    })
})