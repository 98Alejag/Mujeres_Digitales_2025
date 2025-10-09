import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  // findAll() {
  //   return this.productRepo.find();
  // }
  async findAll(): Promise<Product[]> {
    return this.productRepo.find({ where: { isActive: true } });
  }
  async findOne(id: number) {
    const productFind = this.productRepo.findOneBy({ id });
    if (!productFind)
      throw new NotFoundException(`Product with id ${id} not found`);
    return productFind;
  }
  async findByName(name: string): Promise<Product[]> {
    const products = await this.productRepo.find({
      where: { name: ILike(`%${name}%`), isActive: true },
    });

    if (products.length === 0) {
      throw new NotFoundException(`No products found with name: ${name}`);
    }

    return products;
  }

  create(newProduct: CreateProductDTO) {
    const productCreated = this.productRepo.create(newProduct);
    return this.productRepo.save(productCreated);
  }
  async update(id: number, updatedProduct: UpdateProductDTO) {
    await this.productRepo.update(id, updatedProduct);
    return this.productRepo.findOneBy({ id });
  }
  async disable(id: number): Promise<void> {
    const productRemoved = await this.productRepo.findOne({ where: { id } });
    if (!productRemoved)
      throw new NotFoundException(`Product with id ${id} not found`);
    productRemoved.isActive = false;
    await this.productRepo.save(productRemoved);
  }
}

