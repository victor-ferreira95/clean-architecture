import CreateProductUseCase from './create.product.usecase'

const input = {
  name: 'Product 1',
  price: 100,
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test create product use case', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    const output = await createProductUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  })

  it('should throw an error when name is empty', async () => {
    const productRepository = MockRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    input.name = ''
    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      'Name is required',
    )
  })

  it('should throw an error when price is less than zero', async () => {
    const productRepository = MockRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    const input2 = {
      name: 'Product 2',
      price: -1,
    }
    await expect(createProductUseCase.execute(input2)).rejects.toThrow(
      'Price must be greater than zero',
    )
  })
})
