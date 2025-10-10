import {
  Controller, Get, Param, Post, Put, Body, Patch, ParseIntPipe, UseGuards, Query} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Product } from 'src/entities/product.entity';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findAll() {
    return this.productsService.findAll();
  }
  @Get(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }
  @Get('search/:name')
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  async searchByName(@Param('name') name: string): Promise<Product[]> {
    return this.productsService.findByName(name);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.ADMIN)
  create(@Body() body: CreateProductDTO) {
    return this.productsService.create(body);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.ADMIN)
  update(@Param('id') id: string, @Body() body: UpdateProductDTO) {
    return this.productsService.update(Number(id), body);
  }
  @Patch(':id/disable')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.ADMIN)
  disable(@Param('id', ParseIntPipe) id: number): Promise<{ message: string}> {
    return this.productsService.disable(id);
  }
}
