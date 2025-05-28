import Product from '../../../domain/product/entity/product'
import { v4 as uuid } from 'uuid'
import UpdateProductUseCase from './update.product.usecase'

const product = new Product(uuid(), 'Product 1', 100)

const input = {
  id: product.id,
  name: 'Product 1 Updated',
  price: 200,
}

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(product),
    update: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  }
}

describe('Unit test for product update use case', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository()
    const updateProductUseCase = new UpdateProductUseCase(productRepository)

    const output = await updateProductUseCase.execute(input)

    expect(output).toEqual(input)
  })
})
