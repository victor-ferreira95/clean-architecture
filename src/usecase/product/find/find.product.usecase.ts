import ProductRepositoryInterface from '../../../domain/product/repository/product.repository.interface'
import { InputFindProductDto, OutputFindProductDto } from './find.product.dto'

export default class FindProductUseCase {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    try {
      const product = await this.productRepository.find(input.id)

      if (!product) {
        throw new Error('Product not found')
      }

      return {
        id: product.id,
        name: product.name,
        price: product.price,
      }
    } catch (error) {
      throw new Error('Product not found')
    }
  }
}
