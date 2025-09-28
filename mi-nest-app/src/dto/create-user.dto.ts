import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, MaxLength, Min, MinLength } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    @Min(18, {message: 'Debe ser mayor de edad'})
    age?: number;
}