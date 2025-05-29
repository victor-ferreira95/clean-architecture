import Product from '../../../domain/product/entity/product'
import { v4 as uuid } from 'uuid'
import UpdateProductUseCase from './update.product.usecase'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'

const product = new Product(uuid(), 'Product 1', 100)

const input = {
  id: product.id,
  name: 'Product 1 Updated',
  price: 200,
}

describe('Unit test for product update use case', () => {
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

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    await productRepository.create(product)

    const updateProductUseCase = new UpdateProductUseCase(productRepository)

    const output = await updateProductUseCase.execute(input)

    expect(output).toEqual(input)
  })
})
