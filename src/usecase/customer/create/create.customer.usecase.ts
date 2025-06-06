import CustomerRepositoryInterface from '../../../domain/costumer/repository/costumer.repository.interface'
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from './create.customer.dto'
import Address from '../../../domain/costumer/value-object/address'
import CustomerFactory from '../../../domain/costumer/factory/costumer.factory'

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(
    input: InputCreateCustomerDto,
  ): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city,
      ),
    )
    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      },
    }
  }
}
