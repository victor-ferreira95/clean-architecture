import CustomerFactory from '../../../domain/costumer/factory/costumer.factory'
import Address from '../../../domain/costumer/value-object/address'
import ListCustomerUseCase from './list.customer.usecase'

const customer1 = CustomerFactory.createWithAddress(
  'John Doe',
  new Address('Street', 1, 'Zip', 'City'),
)

const customer2 = CustomerFactory.createWithAddress(
  'Jane Doe 2',
  new Address('Street 2', 2, 'Zip 2', 'City 2'),
)

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1, customer2]),
    update: jest.fn(),
  }
}

describe('Unit test list customer usecase', () => {
  it('should list all customers', async () => {
    const customerRepository = MockRepository()
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository)

    const output = await listCustomerUseCase.execute({})

    expect(output.customers.length).toBe(2)
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.Address.street)
    expect(output.customers[0].address.number).toBe(customer1.Address.number)
    expect(output.customers[0].address.zip).toBe(customer1.Address.zip)
    expect(output.customers[0].address.city).toBe(customer1.Address.city)

    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.street).toBe(customer2.Address.street)
    expect(output.customers[1].address.number).toBe(customer2.Address.number)
    expect(output.customers[1].address.zip).toBe(customer2.Address.zip)
    expect(output.customers[1].address.city).toBe(customer2.Address.city)
  })
})
