import { Injectable, NotFoundException } from '@nestjs/common';
import { Iproduct } from '../../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductDTO } from 'src/dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }
  async findOne(id: number) {
    const productFind = this.productRepo.findOneBy({ id });
    if (!productFind)
      throw new NotFoundException(`Product with id ${id} not found`);
    return productFind;
  }
  create(newProduct: CreateProductDTO) {
    const productCreated = this.productRepo.create(newProduct);
    return this.productRepo.save(productCreated);
  }
  // update(id: number, newProduct: Omit<Iproduct, 'id'>): Iproduct {
  //   const product = this.findOne(id);
  //   Object.assign(product, newProduct);
  //   return product;
  // }
  // remove(id: number) {
  //   const product = this.products.findIndex((product) => product.id === id);
  //   this.products.splice(product, 1);
  //   return { remove: true };
  // }
}
