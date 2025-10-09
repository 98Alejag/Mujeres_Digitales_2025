import { Controller, Get, Param, Post, Put, Body, Patch, ParseIntPipe, UseGuards, Query} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Product } from 'src/entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }
  @Get('search/:name')
  async searchByName(@Param('name') name: string): Promise<Product[]> {
  return this.productsService.findByName(name);
}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateProductDTO) {
    return this.productsService.create(body);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateProductDTO) {
    return this.productsService.update(Number(id), body);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id/disable')
  disable(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.disable(id);
  }
}
