import CustomerRepositoryInterface from '../../../domain/costumer/repository/costumer.repository.interface'
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from './find.customer.dto'

export default class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    // a nossa enitdade não pode passar pra fora da camada usecase
    const customer = await this.customerRepository.find(input.id)

    if (!customer) {
      throw new Error('Customer not found')
    }

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address._street,
        city: customer.Address._city,
        number: customer.Address._number,
        zip: customer.Address._zip,
      },
    }
  }
}
