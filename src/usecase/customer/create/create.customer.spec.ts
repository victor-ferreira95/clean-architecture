import CreateCustomerUseCase from './create.customer.usecase'

const input = {
  name: 'John Doe',
  address: {
    street: 'Main St',
    number: 123,
    city: 'New York',
    zip: '12345',
  },
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe('unit test create customer usecase', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    const output = await createCustomerUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip,
      },
    })
  })

  it('should throw an error when name is missing', async () => {
    const customerRepository = MockRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    input.name = ''

    expect(() => {
      return createCustomerUseCase.execute(input)
    }).rejects.toThrow('Name is required')
  })

  it('should throw an error when street is missing', async () => {
    const customerRepository = MockRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    input.address.street = ''

    expect(() => {
      return createCustomerUseCase.execute(input)
    }).rejects.toThrow('Street is required')
  })
})
