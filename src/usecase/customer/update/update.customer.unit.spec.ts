import CustomerFactory from '../../../domain/costumer/factory/costumer.factory'
import Address from '../../../domain/costumer/value-object/address'
import UpdateCustomerUseCase from './update.customer.usecase'

const customer = CustomerFactory.createWithAddress(
  'John Doe',
  new Address('Street', 1, 'Zip', 'City'),
)

const input = {
  id: customer.id,
  name: 'John Doe Updated',
  address: {
    street: 'Street Updated',
    number: 1245,
    zip: 'Zip Updated',
    city: 'City Updated',
  },
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test update customer usecase', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository()
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository)

    const output = await updateCustomerUseCase.execute(input)

    expect(output).toEqual(input)
  })
})
