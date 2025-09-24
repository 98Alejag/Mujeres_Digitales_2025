import { Injectable, NotFoundException } from '@nestjs/common';
import { Iproduct } from '../../interfaces';


@Injectable()
export class ProductsService {

    private products: Iproduct[] = [
        { id: 1,name: 'Locion', description: 'Loción de noche', category: 'personal', currency: 'COP', price: 20000, stock: 100},
        { id: 2, name: 'Camiseta', description: 'Camiseta negra', category: 'ropa', currency: 'COP', price: 50000, stock: 100}
    ]
    findALL(): Iproduct[] {
        return this.products;
    }
    findOne(id: number): Iproduct {
        const productFind = this.products.find((product) => product.id === id)
        if (!productFind) throw new NotFoundException(`Product with id ${id} not found`)
        return productFind
    }
    create(product : Omit<Iproduct, 'id'>): Iproduct {
            const newId = this.products.length > 0
            ? this.products[this.products.length - 1].id + 1
            : 1;
    
            const newProduct = { id: newId, ...product };
            this.products.push(newProduct);
            return newProduct;
        }
        update(id: number, newProduct: Omit<Iproduct, 'id'>): Iproduct {
            const product = this.findOne(id);
            Object.assign(product, newProduct);   
            return product;
        }
        remove(id: number) {
            const product = this.products.findIndex((product) => product.id === id);
            this.products.splice(product, 1)
            return { remove: true }
        }
}
