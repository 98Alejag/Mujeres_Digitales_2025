import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
export class UpdateProductDTO {
  
  @ApiProperty({example: 'Camiseta', description: 'Nombre del producto', required: false})
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({example: 'Camiseta de algodon', description: 'Descripción del producto', required: false})
  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;

  @ApiProperty({example: 'Ropa', description: 'Categoria a la que pertence producto', required: false})
  @IsOptional()
  @IsString()
  @MaxLength(20)
  category?: string;

  @ApiProperty({example: 'COP', description: 'Moneda en que se comercializa', required: false})
  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;

  @ApiProperty({example: '25000', description: 'Precio de venta del producto', required: false})
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({example: '50', description: 'Cantidad de productos disponibles', required: false})
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
  
  @ApiProperty({example: 'true', description: 'Estado del producto', required: false})
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
