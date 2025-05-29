import { Sequelize } from 'sequelize-typescript'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import CreateProductUseCase from './create.product.usecase'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'

const input = {
  name: 'Product 1',
  price: 100,
}

describe('Unit test create product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    const output = await createProductUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  })

  it('should throw an error when name is empty', async () => {
    const productRepository = new ProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    input.name = ''
    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      'Name is required',
    )
  })

  it('should throw an error when price is less than zero', async () => {
    const productRepository = new ProductRepository()
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
