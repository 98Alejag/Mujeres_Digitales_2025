import { NotFoundException } from "@nestjs/common";
import { ProductsService } from "./products.service"

const mockProducts = [
    { id: 1, name: 'Camiseta', description: 'Seda', price: 25000, stock: 20, isActive: true},
    { id: 2, name: 'Pantalon', description: 'Jean', price: 50000, stock: 20, isActive: true}
]

fdescribe('ProductService', () => {
    let service: ProductsService;
    let fakeRepo: any;

    beforeEach(() => {
        jest.clearAllMocks();
        fakeRepo = {
            find: jest.fn(),
            findBy: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
        }
        service = new ProductsService(fakeRepo);
    })
    it('Deberia devolver todos los productos', async () => {
        fakeRepo.findBy.mockResolvedValue(mockProducts)
        const result = await service.findAll()
        expect(fakeRepo.findBy).toHaveBeenCalledWith({isActive: true})
        expect(result[0].name).toEqual('Camiseta')
    })
    it('Deberia devolver un producto por id', async () => {
        fakeRepo.findOneBy.mockResolvedValue(mockProducts[0])
        const result = await service.findOne(1)
        expect(result.description).toEqual('Seda')
    })
    it('Deberia lanza un NotFoundException si el producto no existe', async () => {
        fakeRepo.findOneBy.mockResolvedValue(null)
        await expect(service.findOne(99)).rejects.toThrow(NotFoundException)
        expect(fakeRepo.findOneBy).toHaveBeenCalledWith({ id: 99})
    })
    it('Deberia devolver un producto por nombre', async () => {
        fakeRepo.find.mockResolvedValue(mockProducts[0])
        const result = await service.findByName('Camiseta')
        expect(result.name).toEqual('Camiseta')
    })
    it('Deberia crear un nuevo producto', async () =>{
        const newProductMock = { name: 'Gorra', description: 'Plana', price: 30000, stock: 20, isActive: true}
        fakeRepo.save.mockResolvedValue({ id:3, ...newProductMock})
        const result = await service.create(newProductMock as any)
        expect(result.id).toEqual(3)
    })
    it('Deberia actualizar un producto y retornarlo', async ()=> {
        const updateProductMock = {name: 'Camiseta manga larga', description: 'Seda', price: 25000, stock: 20, isActive: true}
        const updatedProductMock = { id: 1, ...updateProductMock}
        fakeRepo.update.mockResolvedValue({ affected: 1})
        fakeRepo.findOneBy.mockResolvedValue(updatedProductMock)

        const result = await service.update(1, updateProductMock)
        expect(fakeRepo.update).toHaveBeenCalledWith(1, updateProductMock)
        expect(result).toEqual(updatedProductMock)

    })
    it('Deberia desactivar un producto', async () => {
        const product = { id: 1, name: 'Camiseta', isActive: true};

        fakeRepo.findOne.mockResolvedValue(product);
        fakeRepo.save.mockResolvedValue({ ...product, isActive: false });

        const result = await service.disable(1)

        expect(fakeRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } })
        expect(fakeRepo.save).toHaveBeenCalledWith({ ...product, isActive: false })
        expect(result).toEqual({
            message: `Product with id 1 disable successfully`,
        });
    })

})