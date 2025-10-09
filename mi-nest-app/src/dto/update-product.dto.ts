import { IsBoolean, IsOptional } from 'class-validator';
import { CreateProductDTO } from './create-product.dto';

export class UpdateProductDTO extends CreateProductDTO {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
