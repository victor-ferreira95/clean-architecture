import { Sequelize } from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'
import FindProductUseCase from './find.product.usecase'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'

const product = new Product('1', 'Product 1', 100)

describe('Unit test find product use case', () => {
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
  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    await productRepository.create(product)

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
    const productRepository = new ProductRepository()
    const findProductUseCase = new FindProductUseCase(productRepository)

    const input = {
      id: '1',
    }

    await expect(findProductUseCase.execute(input)).rejects.toThrow(
      'Product not found',
    )
  })
})
