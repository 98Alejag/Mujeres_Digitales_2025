import { IsCurrency, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateProductDTO {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    description: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    category: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(3)
    currency: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock: number;

}