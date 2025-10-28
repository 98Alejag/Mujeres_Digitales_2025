import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateProductDTO {

    @ApiProperty({example: 'Camiseta', description: 'Nombre del producto '})
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @ApiProperty({example: 'Camiseta de algodon', description: 'Descripción del producto '})
    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    description: string;

    @ApiProperty({example: 'Ropa', description: 'Categoria a la que pertence producto '})
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    category: string;
    
    @ApiProperty({example: 'COP', description: 'Moneda en que se comercializa '})
    @IsNotEmpty()
    @IsString()
    @MaxLength(3)
    currency: string;
    
    @ApiProperty({example: '25000', description: 'Precio de venta del producto '})
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
    
    @ApiProperty({example: '50', description: 'Cantidad de productos disponibles '})
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock: number;
    
}