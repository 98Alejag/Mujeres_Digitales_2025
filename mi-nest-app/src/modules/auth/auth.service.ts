import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from 'src/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity'

@Injectable()
export class AuthService {
    constructor(
            @InjectRepository(User)
            private userRepo: Repository<User>, 
        ) {}
        
    async login(data: LoginDTO) {
        const user = await this.userRepo.findOne({ where: { email: data.email }});

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }
        const isValidPassword = data.password === user.password
        
        if (!isValidPassword) {
            throw new UnauthorizedException("Invalid credentials");
        }
        return {
            user: { id: user.id, name: user.name, email: user.email, age: user.age },
            accessToken: `fake-token-${user.id}-${Date.now()}`
        }
    }
}