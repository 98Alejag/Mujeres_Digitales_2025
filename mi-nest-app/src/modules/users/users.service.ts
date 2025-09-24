import { Injectable, NotFoundException } from '@nestjs/common';
import { Iuser } from 'src/interfaces';

@Injectable()
export class UsersService {

    private users: Iuser[] = [
        { id: 1, name: 'Alejandra', email: '98alejag@gmail.com', password: 'Aleja2005', age: 27}, 
        { id: 2, name: 'Alisson', email: 'alisson@gmail.com', password: 'Alisson2005', age: 18}
    ]

    findALL(): Iuser[] {
        return this.users; 
    }
    findOne(id: number): Iuser {
        const userFind = this.users.find((user) => user.id === id)
        if (!userFind) throw new NotFoundException(`User with id ${id} not found`)
        return userFind
    }
    create(user : Omit<Iuser, 'id'>): Iuser {
        const newId = this.users.length > 0
        ? this.users[this.users.length - 1].id + 1
        : 1;

        const newUser = { id: newId, ...user };
        this.users.push(newUser);
        return newUser;
    }
    update(id: number, newUser: Omit<Iuser, 'id'>): Iuser {
        const user = this.findOne(id);
        Object.assign(user, newUser);   
        return user;
    }
    remove(id: number) {
        const user = this.users.findIndex((user) => user.id === id);
        this.users.splice(user, 1)
        return { remove: true }
    }
}
