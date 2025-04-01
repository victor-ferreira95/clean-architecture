import Customer from '../../../domain/costumer/entity/customer'
import Address from '../../../domain/costumer/value-object/address'
import FindCustomerUseCase from './find.customer.usecase'

const customer = new Customer('123', 'John Doe')
const address = new Address('Street', 1, 'Zip', 'City')
customer.changeAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test find customer usecase', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

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
