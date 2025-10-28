import { Controller, Get, Param, Post, Put, Body, Patch, ParseIntPipe, UseGuards, Query} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Product } from 'src/entities/product.entity';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Products')
@ApiBearerAuth()
@Controller('/api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({summary: 'Obtener todos los productos'})
  @ApiResponse({status:200, description:'Lista de productos retornados desde la DB' })
  findAll() {
    return this.productsService.findAll();
  }
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Obtiene el producto por ID'})
  @ApiResponse({status:200, description:'producto encontrado desde DB' })
  @ApiResponse({status:400, description:'producto no encontrado en la DB' })
  @Roles(RolesEnum.ADMIN)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }
  @Get('search/:name')
  @ApiOperation({summary: 'Obtiene el/los productos(s) encontrados por nombre en la DB'})
  @ApiResponse({status:200, description:'Productos(s) encontrado(s) desde DB' })
  @ApiResponse({status:400, description:'Productos(s) no encontrado(s) en la DB' })
  async searchByName(@Param('name') name: string): Promise<Product[]> {
    return this.productsService.findByName(name);
  }
  @Post()
  @ApiBearerAuth()
  @ApiOperation({summary: 'Crear un nuevo producto'})
  @ApiResponse({status:201, description:'Producto creado exitosamente en DB' })
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.ADMIN)
  create(@Body() body: CreateProductDTO) {
    return this.productsService.create(body);
  }
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Actualizar un producto existente'})
  @ApiResponse({status:200, description:'Producto actualizado en exitosamente en DB' })
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.ADMIN)
  update(@Param('id') id: string, @Body() body: UpdateProductDTO) {
    return this.productsService.update(Number(id), body);
  }
  @Patch(':id/disable')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Inactiva un producto existente'})
  @ApiResponse({status:200, description: 'Producto inactivado exitosamente en la DB'})
  @ApiResponse({status:400, description: 'Producto no encontrado en la DB'})
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.ADMIN)
  disable(@Param('id', ParseIntPipe) id: number): Promise<{ message: string}> {
    return this.productsService.disable(id);
  }
}
