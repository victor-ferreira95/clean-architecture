import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../infrastructure/costumer/repository/sequelize/customer.model'
import CustomerRepository from '../../../infrastructure/costumer/repository/sequelize/costumer.repository'
import Customer from '../../../domain/costumer/entity/customer'
import Address from '../../../domain/costumer/value-object/address'
import FindCustomerUseCase from './find.customer.usecase'

describe('Test find customer usecase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const customer = new Customer('123', 'John Doe')
    const address = new Address('Street', 1, 'Zip', 'City')

    customer.changeAddress(address)

    await customerRepository.create(customer)

    const input = {
      id: '123',
    }

    const output = {
      id: '123',
      name: 'John Doe',
      address: {
        street: 'Street',
        city: 'City',
        number: 1,
        zip: 'Zip',
      },
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })
})
