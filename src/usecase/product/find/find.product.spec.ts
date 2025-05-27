import Product from '../../../domain/product/entity/product'
import FindProductUseCase from './find.product.usecase'

const product = new Product('1', 'Product 1', 100)

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test find product use case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository()
    const findProductUseCase = new FindProductUseCase(productRepository)

    const input = {
      id: '1',
    }

    const output = await findProductUseCase.execute(input)

    expect(output).toEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
  })

  it('should not find a product', async () => {
    const productRepository = MockRepository()
    productRepository.find.mockResolvedValue(null)
    const findProductUseCase = new FindProductUseCase(productRepository)

    const input = {
      id: '1',
    }

    await expect(findProductUseCase.execute(input)).rejects.toThrow(
      'Product not found',
    )
  })
})
