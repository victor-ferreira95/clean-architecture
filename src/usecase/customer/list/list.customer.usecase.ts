import Customer from '../../../domain/costumer/entity/customer'
import CustomerRepositoryInterface from '../../../domain/costumer/repository/costumer.repository.interface'
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from './list.customer.dto'

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll()

    return OutputMapper.toOutput(customers)
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.Address.street,
          number: customer.Address.number,
          zip: customer.Address.zip,
          city: customer.Address.city,
        },
      })),
    }
  }
}
