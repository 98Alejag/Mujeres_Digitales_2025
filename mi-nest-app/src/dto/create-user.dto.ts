import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsPositive, MaxLength, Min, MinLength } from "class-validator";
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

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    @Min(18)
    @Type(() => Number)
    age: number;
}