import { Roles } from "src/entities/user.entity";

export type Iuser = {
    id: number, 
    name: string, 
    email: string, 
    password: string, 
    age?: number,
    role: Roles,
};